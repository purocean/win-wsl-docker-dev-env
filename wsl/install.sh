#!/bin/sh

(
cat <<EOF

case \$- in
    *c*) ;;
      *) exec docker_bash fish;;
esac
EOF
) >> ~/.bashrc

mkdir ~/xbin
cp docker* ~/xbin
chmod +x ~/xbin/docker*
sudo ln -s ~/xbin/docker* /usr/bin/
