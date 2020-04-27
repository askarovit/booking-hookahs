DROP PROCEDURE IF EXISTS `make_order_hookah_procedure`;

CREATE PROCEDURE make_order_hookah_procedure(
    IN customer_param varchar(45),
    IN date_param datetime,
    IN amount_people_param tinyint
)
sp: BEGIN
	DECLARE amount_tube TINYINT default 0;
    DECLARE new_order_id TINYINT default 0;
    DECLARE CustomerIsAlreadyBooking BOOLEAN default 0;

    -- Search orders by customer name
    SET CustomerIsAlreadyBooking = (SELECT EXISTS (
        SELECT *
        FROM network_hookah_db.`order` as o
        WHERE o.customer = customer_param
    ));

    IF (CustomerIsAlreadyBooking = 1) THEN
        -- The client is found and exit the procedure
        SELECT 'This Customer is already booked' as message;
        LEAVE sp;
    END IF;

    -- Create a temporary table with possible hookahs
	CREATE TEMPORARY TABLE order_hookahs_temporary (
		id tinyint(11),
        amount_tube tinyint(2)
	);

    -- Inserting into temporary table a possible hookahs
	INSERT INTO order_hookahs_temporary (id, amount_tube)
    SELECT H.id, H.amount_tube
	FROM ( SELECT * FROM network_hookah_db.`hookah` AS h WHERE h.amount_tube <= amount_people_param) AS H
	WHERE H.id NOT IN (
		SELECT OH.hookah_id
		FROM network_hookah_db.`order_hookah` AS OH
		LEFT JOIN network_hookah_db.`order` AS O ON O.id = OH.order_id
		WHERE DATE(date_param) BETWEEN DATE(O.date - INTERVAL 30 minute) AND DATE(O.date + INTERVAL 30 minute)
	)
    ORDER BY H.amount_tube DESC
    ;

    -- @totam_amount_tube - Count the number of free hookahs to check the ability to serve all customers
    SET @totam_amount_tube = (SELECT SUM(order_hookahs_temporary.amount_tube) FROM order_hookahs_temporary);

	IF (@totam_amount_tube >= amount_people_param)
		THEN
		    -- Creating new order into order table and getting ID order "new_order_id"
			INSERT INTO  network_hookah_db.`order` (customer, date, amount_people) VALUES (customer_param, date_param, amount_people_param);
			SET new_order_id = (SELECT LAST_INSERT_ID());

            -- Creating a loop that will add a link to the table "order_hookah" for customer and order.
			REPEAT
				INSERT INTO network_hookah_db.`order_hookah` (hookah_id, order_id)
					SELECT h.id, new_order_id
					FROM order_hookahs_temporary as h
					WHERE amount_people_param >= h.amount_tube + amount_tube AND h.id NOT IN (
						SELECT hookah_id FROM network_hookah_db.`order_hookah` WHERE order_id = new_order_id
                    )
					LIMIT 1;

				SET amount_tube = amount_tube + (
					SELECT SUM(h.amount_tube)
					FROM network_hookah_db.`order_hookah` AS orh
					LEFT JOIN network_hookah_db.`hookah` AS h ON orh.hookah_id = h.id
					WHERE orh.id = LAST_INSERT_ID()
                );

                -- Match the number of tubes with the number of customers
				UNTIL amount_people_param <= amount_tube
			END REPEAT;
			SELECT 'The hookah was booked successfully' as message;
	ELSE SELECT 'Not enough free places' as message;

    END IF;

	DROP TABLE order_hookahs_temporary;
END;