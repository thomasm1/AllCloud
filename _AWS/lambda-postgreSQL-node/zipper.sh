#!/bin/bash

#Lambda cannot detect your files, as zip nests your files in another directory. run 
zip -r function.zip index.js node_modules
