//$('tbody').load('/Reviews/Search2?query=' + q)

$(function () {
    $('form').submit(async e => {
        e.preventDefault();
        const q = $('#SearchQuery').val();
        var response = await fetch('Reviews/SearchToJson?query=' + q);
        var data = await response.json();
        //update the reviews table:
        let template = $('#reviewRowTemplate').html();
        let results = '';
        let sumOfRate = 0;
        for (var item in data) {
            sumOfRate+=data[item].rate
            //sumOfRate +=item[]
            let row = template;
            for (var key in data[item]) {
                row = row.replaceAll('{' + key + '}', data[item][key]);
                row = row.replaceAll('%7B' + key + '%7D', data[item][key]);
            }
            results += row;
        }
        $('tbody').html(results);
        //update the current rating:
        //let template = $('#reviewRowTemplate').html();

        let str = sumOfRate.toString();
        $('#scoreSide').html("Avarage Rating of showed reviews is: "+ str);

    })

});
