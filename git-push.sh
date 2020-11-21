
echo 'Commit & Push Operation will be performed using ssh, make sure ssh public key added to github'
read -p 'Commit Message: ' message
git add .
git commit -m "$message"
git push
