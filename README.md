# orphaned-proton
An HTTP reflector, used for testing.

Github repo: [flightstats/orphaned-proton](https://github.com/flightstats/orphaned-proton)

## Routes

### GET /health

Returns 200 OK

### GET /ip

Reflects back just the IP address of the calling host

### GET /status/{code}

Returns HTTP {code} and a JSON body containing the request headers and source IP address.
