DROP PROCEDURE IF EXISTS `MakeOrderHookah`;

CREATE PROCEDURE MakeOrderHookah(
	IN amount_people_param tinyint,
    IN date_param datetime,
    IN customer_param varchar(45)
)
BEGIN
	DECLARE amount_tube TINYINT default 0;
    DECLARE new_order_id TINYINT default 0;

	CREATE TEMPORARY TABLE order_hookahs_temporary (
		id tinyint(11),
        amount_tube tinyint(2)
	);

    -- Getting free hookahs for ordering
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

    SET @totam_amount_tube = (SELECT SUM(order_hookahs_temporary.amount_tube) FROM order_hookahs_temporary);

	IF (@totam_amount_tube >= amount_people_param)
		THEN
			INSERT INTO  network_hookah_db.`order` (customer, date, amount_people) VALUES (customer_param, date_param, amount_people_param);
			SET new_order_id = (SELECT LAST_INSERT_ID());

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

				UNTIL amount_people_param <= amount_tube
			END REPEAT;
			SELECT 'The hookah was booked successfully' as message;
	ELSE SELECT 'Not enough free places' as message;

    END IF;

	DROP TABLE order_hookahs_temporary;
END;