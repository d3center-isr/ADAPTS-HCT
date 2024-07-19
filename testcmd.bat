@echo off
if not exist *.txt (
echo This directory contains no text files.
) else (
   echo This directory contains the following text file^(s^):
   echo.
   dir /b *.txt
   )