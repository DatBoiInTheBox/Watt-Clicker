function formatCP(value){

if(value >= 1000000)
return (value/1000000).toFixed(2)+" TB"

if(value >= 1000)
return (value/1000).toFixed(2)+" GB"

return value+" MB"

}