MEMORIZE
 
#! /bin/bash
# finder
grep $1 text > /dev/null
if [ $? -eq 0 ]
then
echo "found"
fi
exit 0
	unix[35] finder ancient
	found
	unix[36] finder modern
	unix[37]
	
	
#!/bin/sh
# isEmpty
if [ -s $1 ]
then
echo "The file $1 has contents."
exit 0
else
echo "The file $1 is absent or empty."
exit 1
fi
	unix[40] empty text
	The file text has contents.
	unix[41] empty xxxx
	The file xxxx is absent or empty.
	unix[42] echo $?
	1
	unix[43]

	
#! /bin/bash
# parameters  
echo "There are $# parameters."
echo "The parameters are $@"
echo "The script name is $0"
echo "The first parameter is $1"
echo "The second parameter is $2"
exit 0
	unix[11] pars apple orange
	There are 2 parameters.
	The parameters are apple orange
	The script name is ./pars
	The first parameter is apple
	The second parameter is orange
	unix[12] 
	
#! /bin/bash
# remove [ Exit Codes ] 
touch junk
echo "touch junk   The return code from rm was $?" 

rm junk
echo "rm junk     The return code from rm was $?" 
rm junk
echo "rm junk The return code from rm was $?"
exit 0
	unix[5] touch junk
	unix[6] rem
	The return code from rm was 0
	unix[7] rem
	rm: junk: No such file or directory
	The return code from rm was 2


