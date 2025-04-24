#!/bin/bash
yum update -y
yum install amazon-efs-utils -y
yum install java-17 -y
 


curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
nvm install v14 

wget https://dev.mysql.com/get/mysql80-community-release-el7-5.noarch.rpm
yum -y install mysql80-community-release-el7-5.noarch.rpm
yum repolist
yum -y install mysql-server && yum clean all
systemctl start mysqld
systemctl enable mysqld

yum install -y httpd 
systemctl start httpd.service # service httpd start
systemctl enable httpd.service # chkconfig httpd on
EC2_AVAIL_ZONE=$(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone)
echo "<html><h4>Hello from hostname, $(hostname -f) in AZ $EC2_AVAIL_ZONE</h4></html>" > /var/www/html/index.html	
