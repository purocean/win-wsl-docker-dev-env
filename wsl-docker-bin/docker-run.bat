@echo off

docker run -d ^
-h dev-env ^
-p 3306:3306 ^
-p 27017:27017 ^
-p 8000-8100:8000-8100 ^
-v C:\:/mnt/c ^
-v Y:\:/mnt/y ^
--name dev-env ubuntu:dev-env
