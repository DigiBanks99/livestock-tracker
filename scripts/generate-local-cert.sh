#! /bin/bash

rm -f -- localhost.conf
rm -f -- localhost.crt
rm -f -- localhost.key
rm -f -- localhost.pfx

echo "Creating cert config..."
touch localhost.conf
echo "[req]" | tee -a localhost.conf
echo "prompt             = no" | tee -a localhost.conf
echo "default_bits       = 2048" | tee -a localhost.conf
echo "default_keyfile    = localhost.key" | tee -a localhost.conf
echo "distinguished_name = req_distinguished_name" | tee -a localhost.conf
echo "req_extensions     = req_ext" | tee -a localhost.conf
echo "x509_extensions    = v3_ca" | tee -a localhost.conf
echo "" | tee -a localhost.conf
echo "[req_distinguished_name]" | tee -a localhost.conf
echo "commonName         = localhost" | tee -a localhost.conf
echo "" | tee -a localhost.conf
echo "[req_ext]" | tee -a localhost.conf
echo "basicConstraints   = critical, CA:true" | tee -a localhost.conf
echo "subjectAltName     = @alt_names" | tee -a localhost.conf
echo "" | tee -a localhost.conf
echo "[v3_ca]" | tee -a localhost.conf
echo "basicConstraints        = critical, CA:false" | tee -a localhost.conf
echo "keyUsage                = keyCertSign, cRLSign, digitalSignature,keyEncipherment" | tee -a localhost.conf
echo "extendedKeyUsage        = critical, serverAuth" | tee -a localhost.conf
echo "subjectAltName = @alt_names" | tee -a localhost.conf
echo "1.3.6.1.4.1.311.84.1.1  = ASN1:UTF8String:ASP.NET Core HTTPS development certificate # Needed to get it imported by dotnet dev-certs" | tee -a localhost.conf
echo "" | tee -a localhost.conf
echo "[alt_names]" | tee -a localhost.conf
echo "DNS.1   = localhost" | tee -a localhost.conf
echo ""

echo "Generating certificate..."
openssl req -x509 -nodes -days 1 -newkey rsa:2048 -keyout localhost.key -out localhost.crt -config localhost.conf --passout pass:
openssl pkcs12 -export -out localhost.pfx -inkey localhost.key -in localhost.crt --passout pass:
echo ""

echo "Verify cert..."
openssl verify -CAfile localhost.crt localhost.crt
echo ""

echo "Trusting cert..."
sudo cp localhost.crt /usr/local/share/ca-certificates
sudo update-ca-certificates
openssl verify localhost.crt
echo ""

echo "Setup LivestockTracker to run with the cert..."

dotnet dev-certs https --clean --import localhost.pfx -p ""
