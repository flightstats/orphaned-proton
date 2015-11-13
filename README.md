# orphaned-proton
An HTTP reflector, used for testing.

## Routes

## GET /

Returns The README.md Documentation

## GET /health

Returns 200 OK

## GET /ip

Reflects back just the IP address of the calling host

## GET /status/{code}

Returns HTTP {code} and a JSON body containing the request headers and source IP address.
