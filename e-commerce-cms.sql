/*
 Navicat Premium Data Transfer

 Source Server         : MYSQL_Local
 Source Server Type    : MySQL
 Source Server Version : 100428 (10.4.28-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : e-commerce-cms

 Target Server Type    : MySQL
 Target Server Version : 100428 (10.4.28-MariaDB)
 File Encoding         : 65001

 Date: 07/03/2024 01:10:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ecm_failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `ecm_failed_jobs`;
CREATE TABLE `ecm_failed_jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ecm_failed_jobs_uuid_unique`(`uuid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ecm_failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for ecm_order_details
-- ----------------------------
DROP TABLE IF EXISTS `ecm_order_details`;
CREATE TABLE `ecm_order_details`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid,
  `order_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NOT NULL,
  `quantity` int NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ecm_order_details
-- ----------------------------
INSERT INTO `ecm_order_details` VALUES ('1cab9042-dbd6-11ee-943f-54ab3ae5a17f', '01c7d13c-5400-4317-9db5-d09a25b6b5b6', '89e8e2f8-da30-11ee-a291-54ab3ae5a17f', 'Sandal Swallow Premium Sekali', 5000.00, 1, '2024-03-06 16:25:14', '2024-03-06 16:25:14');
INSERT INTO `ecm_order_details` VALUES ('2d390d14-dbe2-11ee-943f-54ab3ae5a17f', 'fb68e998-9b2f-4363-9574-515c3ce001dc', '1a46f422-dbe2-11ee-943f-54ab3ae5a17f', 'Shampoo', 2500.00, 3, '2024-03-06 17:51:36', '2024-03-06 17:51:36');
INSERT INTO `ecm_order_details` VALUES ('613d6432-dbd6-11ee-943f-54ab3ae5a17f', '720bd9d1-7bd0-4ae7-a1de-e94292cf5691', '89e8e2f8-da30-11ee-a291-54ab3ae5a17f', 'Sandal Swallow Premium Sekali', 5000.00, 1, '2024-03-06 16:27:09', '2024-03-06 16:27:09');
INSERT INTO `ecm_order_details` VALUES ('613da5a1-dbd6-11ee-943f-54ab3ae5a17f', '720bd9d1-7bd0-4ae7-a1de-e94292cf5691', 'ed782f33-dba2-11ee-943f-54ab3ae5a17f', 'Whitening Part 2', 15000.00, 2, '2024-03-06 16:27:09', '2024-03-06 16:27:09');
INSERT INTO `ecm_order_details` VALUES ('d2254a26-dbd5-11ee-943f-54ab3ae5a17f', 'b700af71-d611-4a85-8601-c667d3acebc7', '89e8e2f8-da30-11ee-a291-54ab3ae5a17f', 'Sandal Swallow Premium Sekali', 5000.00, 1, '2024-03-06 16:23:09', '2024-03-06 16:23:09');
INSERT INTO `ecm_order_details` VALUES ('dc438e91-dbe0-11ee-943f-54ab3ae5a17f', '9895ea99-ee94-44fa-bf7b-e05c4016787b', 'ea7baa10-dbdb-11ee-943f-54ab3ae5a17f', 'Laptop Gaming ASUS', 10000000.00, 5, '2024-03-06 17:42:10', '2024-03-06 17:42:10');

-- ----------------------------
-- Table structure for ecm_orders
-- ----------------------------
DROP TABLE IF EXISTS `ecm_orders`;
CREATE TABLE `ecm_orders`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_date` datetime NOT NULL,
  `amount` decimal(10, 2) NOT NULL,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `snap_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `status` int NOT NULL,
  `payment_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ecm_orders
-- ----------------------------
INSERT INTO `ecm_orders` VALUES ('01c7d13c-5400-4317-9db5-d09a25b6b5b6', '71b44336-da34-11ee-a291-54ab3ae5a17f', 'ORDER-756306', '2024-03-06 16:25:14', 5000.00, NULL, '1976c1cb-c83c-4a4c-8b8c-ff2d933707f3', 2, 'success', 1, '2024-03-06 16:25:14', '2024-03-06 16:26:14');
INSERT INTO `ecm_orders` VALUES ('720bd9d1-7bd0-4ae7-a1de-e94292cf5691', '71b44336-da34-11ee-a291-54ab3ae5a17f', 'ORDER-993250', '2024-03-06 16:27:09', 35000.00, NULL, '2f20f72d-9177-45aa-a429-2711ee42bc17', 2, 'success', 1, '2024-03-06 16:27:09', '2024-03-06 16:27:26');
INSERT INTO `ecm_orders` VALUES ('9895ea99-ee94-44fa-bf7b-e05c4016787b', '71b44336-da34-11ee-a291-54ab3ae5a17f', 'ORDER-517139', '2024-03-06 17:42:10', 50000000.00, NULL, '0f665f51-f606-4b18-a740-8e17576ff487', 2, 'success', 1, '2024-03-06 17:42:10', '2024-03-06 17:42:23');
INSERT INTO `ecm_orders` VALUES ('fb68e998-9b2f-4363-9574-515c3ce001dc', '71b44336-da34-11ee-a291-54ab3ae5a17f', 'ORDER-323754', '2024-03-06 17:51:36', 7500.00, NULL, 'd342e0ce-7e2e-4b36-9bcd-9e08fdec2637', 2, 'success', 1, '2024-03-06 17:51:36', '2024-03-06 17:51:45');

-- ----------------------------
-- Table structure for ecm_password_reset_tokens
-- ----------------------------
DROP TABLE IF EXISTS `ecm_password_reset_tokens`;
CREATE TABLE `ecm_password_reset_tokens`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ecm_password_reset_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for ecm_payments
-- ----------------------------
DROP TABLE IF EXISTS `ecm_payments`;
CREATE TABLE `ecm_payments`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid,
  `order_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `amount` decimal(10, 2) NOT NULL,
  `payment_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ecm_payments
-- ----------------------------

-- ----------------------------
-- Table structure for ecm_personal_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `ecm_personal_access_tokens`;
CREATE TABLE `ecm_personal_access_tokens`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ecm_personal_access_tokens_token_unique`(`token` ASC) USING BTREE,
  INDEX `ecm_personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type` ASC, `tokenable_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ecm_personal_access_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for ecm_product_images
-- ----------------------------
DROP TABLE IF EXISTS `ecm_product_images`;
CREATE TABLE `ecm_product_images`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid,
  `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ecm_product_images
-- ----------------------------
INSERT INTO `ecm_product_images` VALUES ('89e9d180-da30-11ee-a291-54ab3ae5a17f', '89e8e2f8-da30-11ee-a291-54ab3ae5a17f', 'varian 1', 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//91/MTA-60972111/swallow_sandal_swallow_original_tipe_938_-_merah_-size_9_-_10-5-_full03_ddt7t60q.jpg', 'varian 1', 1, '2024-03-04 14:07:27', '2024-03-04 14:07:27');
INSERT INTO `ecm_product_images` VALUES ('89ea0634-da30-11ee-a291-54ab3ae5a17f', '89e8e2f8-da30-11ee-a291-54ab3ae5a17f', 'varian 2', 'https://energybali.co.id/wp-content/uploads/2022/06/8ou.png', 'varian 2', 1, '2024-03-04 14:07:27', '2024-03-04 14:07:27');

-- ----------------------------
-- Table structure for ecm_products
-- ----------------------------
DROP TABLE IF EXISTS `ecm_products`;
CREATE TABLE `ecm_products`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `stock` int NOT NULL,
  `photo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ecm_products
-- ----------------------------
INSERT INTO `ecm_products` VALUES ('1a46f422-dbe2-11ee-943f-54ab3ae5a17f', 'Shampoo', 'Shampoo Sehat', 2500.00, 0, 'https://shopipersia.com/wp-content/uploads/2022/12/Sehat-Garlic-Hair-Shampoo-for-All-Hair-Type-x41.jpg', 1, '2024-03-06 17:51:04', '2024-03-06 17:51:45');
INSERT INTO `ecm_products` VALUES ('89e8e2f8-da30-11ee-a291-54ab3ae5a17f', 'Sandal Swallow Premium Sekali', 'sandal yang digunakan oleh pertapa sakti', 5000.00, 10, 'https://images.tokopedia.net/img/cache/700/product-1/2019/6/16/1543072/1543072_209c3473-cfe0-4b6a-a7bd-d0e5e101cd87_700_700.jpg', 1, '2024-03-04 14:07:27', '2024-03-06 16:27:26');
INSERT INTO `ecm_products` VALUES ('ea7baa10-dbdb-11ee-943f-54ab3ae5a17f', 'Laptop Gaming ASUS', 'terbaik di  masa nya', 10000000.00, 0, 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//95/MTA-3777061/asus_asus-rog-strix-iii-g531gd-gaming-laptop--i5-9300h-1tb-sshd-8gb-gtx1050-4gb-win10-_full06.jpg', 1, '2024-03-06 17:06:47', '2024-03-06 17:42:23');
INSERT INTO `ecm_products` VALUES ('ed782f33-dba2-11ee-943f-54ab3ae5a17f', 'Whitening Part 2', 'Pemutih Kulit Terbaik', 15000.00, 2, 'https://www.rphotographystudio.com/wp-content/uploads/2016/11/IMG_8236-Edit-Edit-Edit-Edit.jpg', 0, '2024-03-06 10:18:51', '2024-03-06 17:07:09');

-- ----------------------------
-- Table structure for ecm_roles
-- ----------------------------
DROP TABLE IF EXISTS `ecm_roles`;
CREATE TABLE `ecm_roles`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ecm_roles
-- ----------------------------
INSERT INTO `ecm_roles` VALUES ('68815a46-9d77-4f75-9748-4c422ae06bd4', 'admin', '2024-03-04 13:16:40', NULL);
INSERT INTO `ecm_roles` VALUES ('6e29b173-a7c3-443d-9516-52d0fcc410c2', 'customer', '2024-03-04 13:16:40', NULL);

-- ----------------------------
-- Table structure for ecm_users
-- ----------------------------
DROP TABLE IF EXISTS `ecm_users`;
CREATE TABLE `ecm_users`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid,
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ecm_users_email_unique`(`email` ASC) USING BTREE,
  INDEX `ecm_users_role_id_foreign`(`role_id` ASC) USING BTREE,
  CONSTRAINT `ecm_users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `ecm_roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ecm_users
-- ----------------------------
INSERT INTO `ecm_users` VALUES ('71b44336-da34-11ee-a291-54ab3ae5a17f', '6e29b173-a7c3-443d-9516-52d0fcc410c2', 'Arthur', 'arthur@mail.com', NULL, '$2y$12$8PrapR/gqhaKsLzVJiv9GOVXbg8l4v2zfSCAzGpEzyfBOvsdw2sTC', NULL, '2024-03-04 14:35:24', '2024-03-04 14:35:24');
INSERT INTO `ecm_users` VALUES ('a7c7c43a-da33-11ee-a291-54ab3ae5a17f', '6e29b173-a7c3-443d-9516-52d0fcc410c2', 'Morgan', 'morgan@mail.com', NULL, '$2y$12$RqnZXSUex1IssKwWw4PXku5YRtLVw74l2T.CQDfJ00gp02bjqYCbG', NULL, '2024-03-04 14:29:45', '2024-03-04 14:29:45');
INSERT INTO `ecm_users` VALUES ('c95699a3-b41c-436f-afdb-f1c7ce0cfb76', '68815a46-9d77-4f75-9748-4c422ae06bd4', 'admin', 'admin@mail.com', NULL, '$2y$12$qhKbKmda/n22BtFgEv.2b.MtLUsho4pCbhmS9GUb3nnMoKcJOBdxq', NULL, '2024-03-04 13:16:40', '2024-03-04 13:16:40');
INSERT INTO `ecm_users` VALUES ('d4a04e33-2ffd-4422-8842-9a7602a78922', '6e29b173-a7c3-443d-9516-52d0fcc410c2', 'customer', 'customer@mail.com', NULL, '$2y$12$afObqVVg0dQp.i./DClLDORQo5NoqEaSq4ZFkhwmOax21xKSUGPgm', NULL, '2024-03-04 13:16:41', '2024-03-04 13:16:41');

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '2014_10_12_100000_create_password_reset_tokens_table', 1);
INSERT INTO `migrations` VALUES (2, '2019_08_19_000000_create_failed_jobs_table', 1);
INSERT INTO `migrations` VALUES (3, '2019_12_14_000001_create_personal_access_tokens_table', 1);
INSERT INTO `migrations` VALUES (4, '2024_03_04_042459_create_roles_table', 1);
INSERT INTO `migrations` VALUES (5, '2024_03_04_090545_create_products_table', 1);
INSERT INTO `migrations` VALUES (9, '2024_03_04_094225_create_payments_table', 1);
INSERT INTO `migrations` VALUES (10, '2024_04_01_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (11, '2024_03_04_091702_create_product_images_table', 2);
INSERT INTO `migrations` VALUES (18, '2024_03_04_090717_create_orders_table', 3);
INSERT INTO `migrations` VALUES (19, '2024_03_04_090724_create_order_details_table', 3);

SET FOREIGN_KEY_CHECKS = 1;
