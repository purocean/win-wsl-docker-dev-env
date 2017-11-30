FROM ubuntu

ENV LANG C.UTF-8
ENV USERNAME username
ENV PASSWORD 123456
ENV MYSQL_ROOT_PASSWORD 123456

# 换源
RUN sed -i 's/archive.ubuntu.com/cn.archive.ubuntu.com/g' /etc/apt/sources.list

# 拷贝一些源
COPY ./mongodb-org-3.4.list /etc/apt/sources.list.d/
COPY ./nodesource.list /etc/apt/sources.list.d/

# 安装开发用的东西
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BC711F9BA15703C6 && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 1655A0AB68576280 && \
    echo "mysql-server mysql-server/root_password password $MYSQL_ROOT_PASSWORD" | debconf-set-selections && \
    echo "mysql-server mysql-server/root_password_again password $MYSQL_ROOT_PASSWORD" | debconf-set-selections && \
    apt-get clean && apt-get update && \
    apt-get install -y php redis-server mysql-server mongodb-org nodejs \
    composer phpmd php-mongodb php-xdebug php7.0-curl php7.0-gd php7.0-mbstring php7.0-mysql php7.0-xml php7.0-zip && \
    rm -rf /var/lib/apt/lists/*

# 安装 yarn 并换源
RUN npm install -g yarn --registry=https://registry.npm.taobao.org && \
    yarn config set registry https://registry.npm.taobao.org

# 安装缺少的东西
RUN apt-get clean && apt-get update && \
    apt-get install -y git tig less fish zip man-db net-tools iputils-ping vim netcat-openbsd sudo apt-utils wget curl && \
    rm -rf /var/lib/apt/lists/*

# 增加用户，加上 sudo 权限
RUN useradd -ms /bin/bash $USERNAME && echo "$USERNAME:$PASSWORD" | chpasswd && usermod -a -G sudo $USERNAME

# 安装 Composer 相关的东西，并换源
RUN sudo -H -u $USERNAME composer config -g repo.packagist composer https://packagist.phpcomposer.com && \
    sudo -H -u $USERNAME composer global require "squizlabs/php_codesniffer" && \
    ln -s "/home/$USERNAME/.composer/vendor/bin/*" /usr/bin/ && \
    rm -rf "/home/$USERNAME/.composer/cache/*"

COPY ./.bashrc ./.vimrc ./.gitconfig "/home/$USERNAME/"

VOLUME /var/lib/mysql /var/lib/mongodb
# 开发端口
EXPOSE 3306 27017 7000-9999
CMD service mysql start && service redis-server start && mongod -f /etc/mongod.conf
