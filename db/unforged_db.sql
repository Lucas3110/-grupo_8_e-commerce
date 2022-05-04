-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2022 a las 22:39:39
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `unforged_db`
--
CREATE DATABASE IF NOT EXISTS `unforged_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `unforged_db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Artista'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `collections`
--

CREATE TABLE `collections` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `collections`
--

INSERT INTO `collections` (`id`, `name`) VALUES
(1, 'Genshin'),
(2, 'Van-Gogh'),
(3, 'Punks'),
(4, 'Magic');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `price` float NOT NULL,
  `description` text NOT NULL,
  `image` varchar(30) NOT NULL,
  `collection_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image`, `collection_id`) VALUES
(1, 'Genshin 1', 0.001, 'Welcome to Inazuma', 'coleccionJo/genshin1.jpg', 1),
(2, 'Van Gohg azzurro medio', 0.02, 'NFT Van Gohg azzurro medio original de un cuadro pintado con inspiracion en Van Gohg, hecho por el artista Simon Leviev', 'coleccionJ/VanGogh1.jpg', 2),
(3, 'Genshin 2', 5, 'Archons and Travelers on a sunny day', 'coleccionJo/genshin2.jpg', 1),
(4, 'Genshin 3', 6.9, 'The truth of the Inazuma Region', 'coleccionJo/genshin3.jpg', 1),
(5, 'Genshin 4', 1.5, 'Adeptis on the Lantern Rite', 'coleccionJo/genshin4.jpg', 1),
(6, 'Van Gogh inspiration', 0.001, 'NFT original de Van Gogh inspiration, un cuadro pintado por el artista Simon Leviev inspirado en Van Gogh', 'coleccionJ/VanGogh2.jpg', 2),
(7, 'Van Gogh Purple tibio', 0.01, 'NFT original de Van Gogh Purple tibio, un cuadro pintado por el artista Simon Leviev inspirado en Van Gogh', 'coleccionJ/VanGogh3.jpg', 2),
(8, 'Van Gogh incredible', 0.003, 'NFT original de Van Gogh incredible, un cuadro pintado por el artista Simon Leviev inspirado en Van Gogh', 'coleccionJ/VanGogh4.jpg', 2),
(9, 'Punk 1', 0.1, 'Clásico NFT especial para usar de avatar donde quieras', 'coleccionL/nft1.jpg', 3),
(10, 'Punk 2', 0.02, 'Especial avatar vintage para lucir en el mundo digital', 'coleccionL/nft2.jpg', 3),
(11, 'Punk 3', 420, 'John te acompañará en el metaverso a donde quieras', 'coleccionL/nft3.jpg', 3),
(12, 'Punk 4', 69, 'Alex te promete que será la mejor inversión de tu vida', 'coleccionL/nft4.jpg', 3),
(13, 'Magic 1', 0.0065, 'Si te gusta el mundo de Magic, este es el NFT para vos', 'coleccionN/mtg5.jpg', 4),
(14, 'Magic 2', 0.0008, 'Si te gusta el mundo de Magic, este es el NFT para vos', 'coleccionN/mtg2.jpg', 4),
(15, 'Magic 3', 1.2, 'Si te gusta el mundo de Magic, este es el NFT para vos', 'coleccionN/mtg3.jpg', 4),
(16, 'Magic 4', 2.3, 'Si te gusta el mundo de Magic, este es el NFT para vos', 'coleccionN/mtg4.jpg', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(30) NOT NULL,
  `image` varchar(100) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `last_name`, `password`, `email`, `image`, `category_id`) VALUES
(13, 'Joan', 'Rey', '$2a$10$hx.w7lV.PW.UarB0TvzA9.fVttfGlGW/MuHnSRAtfD9lWRXk8ysvO', 'joan@gmail.com', 'imagen-1650486511427.jpg', 1),
(14, 'Jessica', 'Martinez', '$2a$10$oYvNdMREmcLQvYE1uxk7duYsAwh4wFVz2HhdiIZ4LkjMZSTiHtjzu', 'jessica@gmail.com', 'imagen-1650486552957.png', 1),
(15, 'Nicolas', 'Tracz', '$2a$10$0dzzVamPnA1I7tjY7kvSzeQlaD1xk6jW5vZI0yxnOGnHEh9DMpJR2', 'nico@gmail.com', 'imagen-1650486588817.jpeg', 1),
(16, 'Lucas', 'Rodriguez', '$2a$10$0bpzc9r1Za3uDlWDTK7.GuMyg4ZZIXK90mJCL83wy.5czdVzSV6YO', 'lucas@gmail.com', 'imagen-1650486684783.jpg', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `collection_id` (`collection_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `collections`
--
ALTER TABLE `collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
