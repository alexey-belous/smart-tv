rm -rf ./app.tar.gz
cp /tmp/app.tar.gz ./
pkill mono
killall mono
rm -rf ./build
tar -zxvf ./app.tar.gz
cd ./build

export DISPLAY=:0.0
mono SmartTV.exe &
