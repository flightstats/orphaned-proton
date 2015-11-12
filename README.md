# orphaned-proton
An HTTP reflector, used for testing.

## Routes

## /health

Returns 200 OK

## /ip

Reflects back just the IP address of the calling host

## /status/{code}

Returns HTTP {code} and a JSON body containing the request headers and source IP address.
