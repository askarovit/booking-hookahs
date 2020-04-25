INSERT INTO `bar` (`id`, `title`) VALUES
(1, 'Bar #1'),
(2, 'Bar #2'),
(3, 'Bar #3'),
(4, 'Bar #4'),
(5, 'Bar #5'),
(6, 'Bar #6'),
(7, 'Bar #7'),
(8, 'Bar #8'),
(9, 'Bar #9');

INSERT INTO `hookah` (`id`, `title`, `amount_tube`, `bar_id`) VALUES
(1, 'Hookah 1', 2, 1),
(2, 'Hookah 2', 4, 1),
(3, 'Hookah 3', 2, 1),
(4, 'Hookah 4', 1, 1),
(5, 'Hookah 5', 4, 2),
(6, 'Hookah 6', 2, 2),
(7, 'Hookah 7', 2, 2),
(8, 'Hookah 8', 4, 2),
(9, 'Hookah 9', 4, 2),
(10, 'Hookah 10', 2, 3),
(11, 'Hookah 11', 2, 3),
(12, 'Hookah 12', 1, 4),
(13, 'Hookah 13', 1, 4),
(14, 'Hookah 14', 1, 4),
(15, 'Hookah 15', 4, 4),
(16, 'Hookah 16', 4, 5),
(17, 'Hookah 17', 6, 6),
(18, 'Hookah 18', 6, 6),
(19, 'Hookah 19', 2, 6),
(20, 'Hookah 20', 4, 6),
(21, 'Hookah 21', 1, 6);

INSERT INTO `order` (`id`, `customer`, `date`, `amount_people`) VALUES
(1, 'Tommy', (NOW() + INTERVAL 1 hour), 2),
(2, 'Capitan Marvel', (NOW() + INTERVAL 3 hour), 4),
(3, 'Hulk', (NOW() - INTERVAL 20 minute), 2);

INSERT INTO `order_hookah` (`id`, `hookah_id`, `order_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 6, 3);
