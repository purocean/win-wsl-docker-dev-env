FROM ubuntu

ENV LANG C.UTF-8

ARG username=userfoo
ARG password=password
ARG mysql_root_password=mysql_root_password

# 换源
RUN sed -i 's/archive.ubuntu.com/cn.archive.ubuntu.com/g' /etc/apt/sources.list

# 拷贝一些源
COPY ./mongodb-org-3.4.list /etc/apt/sources.list.d/
COPY ./nodesource.list /etc/apt/sources.list.d/

# 安装开发用的东西
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BC711F9BA15703C6 && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 1655A0AB68576280 && \
    echo "mysql-server mysql-server/root_password password $mysql_root_password" | debconf-set-selections && \
    echo "mysql-server mysql-server/root_password_again password $mysql_root_password" | debconf-set-selections && \
    apt-get clean && apt-get update && \
    apt-get install -y php redis-server mysql-server mongodb-org nodejs \
    composer phpmd php-mongodb php-xdebug php7.0-curl php7.0-gd php7.0-mbstring php7.0-mysql php7.0-xml php7.0-zip && \
    rm -rf /var/lib/apt/lists/*

# 安装 yarn 并换源
RUN npm config set registry https://registry.npm.taobao.org && \
    npm install -g yarn && \
    yarn config set registry https://registry.npm.taobao.org

# 安装缺少的东西
RUN apt-get clean && apt-get update && \
    apt-get install -y git tig less fish zip man-db net-tools iputils-ping vim netcat-openbsd sudo apt-utils wget curl \
    openjdk-8-jdk make gcc g++ && \
    rm -rf /var/lib/apt/lists/*

# 增加用户，加上 sudo 权限
RUN useradd -ms /bin/bash $username && echo "$username:$password" | chpasswd && usermod -a -G sudo $username

USER $username

# 安装 Composer 相关的东西，并换源
RUN composer config -g repo.packagist composer https://packagist.phpcomposer.com && \
    composer global require "squizlabs/php_codesniffer" && \
    echo $password | sudo -S ln -s /home/$username/.composer/vendor/bin/* /usr/bin/ && \
    echo $password | sudo -S rm -rf /home/$username/.composer/cache/*

RUN npm config set registry https://registry.npm.taobao.org && \
    yarn config set registry https://registry.npm.taobao.org

COPY ./.bashrc ./.vimrc ./.gitconfig /home/$username/

# 安装安卓sdk
ENV ANDROID_HOME /home/$username/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools/bin
RUN wget https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip -O /tmp/temp.zip && unzip /tmp/temp.zip -d $ANDROID_HOME && rm /tmp/temp.zip
RUN yes | sdkmanager --licenses && sdkmanager "build-tools;26.0.0" "platforms;android-16" "platforms;android-26" "platforms;android-25"

# 安装 Gradle
ENV SOFTWARE_PATH=/home/$username/software
ENV PATH=$PATH:$SOFTWARE_PATH/gradle-4.3.1/bin
RUN wget https://services.gradle.org/distributions/gradle-4.3.1-bin.zip -O /tmp/temp.zip && unzip /tmp/temp.zip -d $SOFTWARE_PATH && rm /tmp/temp.zip

VOLUME /var/lib/mysql /var/lib/mongodb
# 开发端口
EXPOSE 3306 27017 7000-9999

USER root
CMD service mysql start && service redis-server start && mongod -f /etc/mongod.conf
