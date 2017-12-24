rm -rf ./app.tar.gz
tar -czvf app.tar.gz ./build
scp ./app.tar.gz raspberry@10.10.0.3:/tmp
scp ./install.sh raspberry@10.10.0.3:/home/raspberry/Desktop
