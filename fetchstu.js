function getAllRequests() {
    fetch('/api/studentFundRequests')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const reader = response.body.getReader();
            return new ReadableStream({
                start(controller) {
                    function push() {
                        reader.read().then(({ done, value }) => {
                            if (done) {
                                controller.close();
                                return;
                            }
                            controller.enqueue(value);
                            push();
                        }).catch(error => {
                            console.error('Error reading response:', error);
                            controller.error(error);
                        });
                    }
                    push();
                }
            });
        })
        .then(stream => new Response(stream))
        .then(response => {
            const reader = response.body.getReader();
            return reader.read();
        })
        .then(({ done, value }) => {
           
            if (!done) {
                const data = new TextDecoder().decode(value);
                console.log(data);
            }
        })
        .catch(error => {
           
            console.error('Error fetching data:', error);
        });
}

getAllRequests()