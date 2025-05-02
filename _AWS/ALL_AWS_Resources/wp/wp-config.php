<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'thomas1mysql' );

/** MySQL database username */
define( 'DB_USER', 'thomas1mysql' );

/** MySQL database password */
define( 'DB_PASSWORD', 'Paris)utpost1' );

/** MySQL hostname */
define( 'DB_HOST', 'thomas1mysql.cmcadlepsyx9.us-east-1.rds.amazonaws.com' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'aI]oh$~zT8(+jec{!lf%V+=nAF`:GV|vkW}O{LT6KpDV}Fal;)_D_/z8J33|LmEh' );
define( 'SECURE_AUTH_KEY',  'Uc5pMSRq?RCXMb5m[lg{wtaS.!H8}MsQx.&|C2p4$;[xQ<7ut<>(&VP[(}xx<B</' );
define( 'LOGGED_IN_KEY',    '`6L8vZ!WlS/[m35{/7IzDRMbL{Z>GutZSM:nWS^UBR;EXo)l,,DhevKM1o y+*Wk' );
define( 'NONCE_KEY',        'g?JSVdXX;4rD%de?fxj9? HU3_k{r5%2T1ni):tlE J&HoY#;(>AUI3!FO1*cON/' );
define( 'AUTH_SALT',        'r;[|y4}w;yGzZk^SFevK#f9a$@rWgI#~mm|Nm;r_sR7a}U*;#^CZ-GK)Z`paaHbU' );
define( 'SECURE_AUTH_SALT', '~?#rINTVVsbV9,h($]:;[AX:U:=zQ|56wF6<TiAz+cd?A-NM<y7(?PhXN<yk?md!' );
define( 'LOGGED_IN_SALT',   '?:zo4AS>wn?7rKA(zQEM)6C,G)y`f Ng,hMs^w/wZ>uQBPJg6ol_feLI.+_Puf3V' );
define( 'NONCE_SALT',       '+qFA1OvQlJH<@a^]u5uRp&Q(xO]PMvt?^PRP:)=K[gmzx9d>`h=xxXG|6r]{PMwJ' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );

