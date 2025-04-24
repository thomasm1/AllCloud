#!/bin/bash
yum update -y
yum install amazon-efs-utils -y
yum install -y gcc-c++ make curl git wget unzip

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
curl -sL https://rpm.nodesource.com/setup_14.x | bash -
yum install -y nodejs
curl -sL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

amazon-linux-extras enable corretto11 corretto17
yum install -y java-11-amazon-corretto java-17-amazon-corretto

yum install -y git

#amazon-linux-extras enable mysql8.0
#yum install -y mysql

#yum install -y oracle-release-el7
#yum install -y oracle-instantclient-basic oracle-instantclient-devel

yum install -y httpd 
systemctl start httpd.service # service httpd start
systemctl enable httpd.service # chkconfig httpd on
EC2_AVAIL_ZONE=$(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone)

echo 'vm.swappiness=10' >> /etc/sysctl.conf
sysctl -p

yum clean all

echo "<html><h4>Hello from hostname, $(hostname -f) in AZ $EC2_AVAIL_ZONE</h4></html>" > /var/www/html/index.html
echo "Installed Versions:"
node -v
npm -v
java -version
git --version
mysql --version

echo "Setup Complete!"
