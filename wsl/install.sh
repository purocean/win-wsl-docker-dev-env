#!/bin/sh

(
cat <<EOF

case $- in
    *c*) ;;
      *) exec docker_bash fish;;
esac
EOF
) >> ~/.bashrc

cp docker* ~/
chmod +x ~/docker*
sudo ln -s ~/docker* /usr/bin/
