#!/bin/bash

sleep 6
filenames=`ls allure-results/`
mkdir -p projects/ontego-traces/results
for i in $filenames
do
   cp "allure-results/$i" "projects/ontego-traces/results/$i"
done
sleep 6




