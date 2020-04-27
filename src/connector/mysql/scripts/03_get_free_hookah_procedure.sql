DROP PROCEDURE IF EXISTS get_free_hookahs_procedure;

CREATE PROCEDURE get_free_hookahs_procedure(
	IN from_param datetime,
	IN to_param datetime,
    IN amount_people_param tinyint(2))
BEGIN

	SELECT H.id, H.title, H.amount_tube, JSON_OBJECT('id', B.id, 'title', B.title) as bar
	FROM (
			  SELECT *
			  FROM network_hookah_db.`hookah`
			  WHERE network_hookah_db.`hookah`.amount_tube <= amount_people_param
          ) AS H
    LEFT JOIN network_hookah_db.`bar` AS B ON B.id = H.bar_id
    WHERE H.id NOT IN (
		SELECT O_H.hookah_id
        FROM network_hookah_db.`order_hookah` AS O_H
		LEFT JOIN network_hookah_db.`order` AS O ON O.id = O_H.order_id
        WHERE O.date BETWEEN DATE(from_param) AND DATE(to_param)
    );
END;