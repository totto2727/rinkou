/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: false, // 不具合でFirebaseのライブラリが動作しなくなるためOFF
}
