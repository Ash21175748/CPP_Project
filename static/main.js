Dropzone.autoDiscover = false;
var currentFile = null;
const myDropzone = new Dropzone("#MyDropZone",{

    url: 'upload/',
    maxFiles: 1,
    maxFilesize: 2,
    acceptedFiles: '.docx',
    addRemoveLinks: true,
    init: function(){


        this.on('addedfile',function(file,response){
            if (currentFile){
                this.removeFile(currentFile)
                }
            currentFile = file;
        })/*end of added file*/

        this.on('success',function(file,response)
        {
                console.log(response)
                $('#Total_Number').text(`Total Number of Words: ${response['total_words_counter']}`);
                $('#table_title').text(`Most Frequent Words`);
                $('.WordsTable').empty();
                $('.WordsTable').css({'visibility':"visible"});
                $('.WordsTable').append(`<tr><th>Word</th><th>Count</th></tr>`);
                for(const [key,value] of Object.entries(response['words_dict']))        {
                    $('.WordsTable').append(`<tr><td>${key}</td><td>${value}</td></tr>`);
                }


                var colors = [];

                for (var i=0; i < Object.keys(response['words_dict']).length; i++){
                    colors.push('#'+(Math.random().toString(16)).slice(2,8));
                }



                const ctx = document.getElementById('WordChart').getContext('2d');
                new Chart(ctx,{
                    type: "bar",
                    data:
                    {
                        labels: Object.keys(response['words_dict']),
                        datasets:[{
                            backgroundColor : colors,
                            data: Object.values(response['words_dict']),
                        }

                    ]

                    },
                    options:{
                        legend:{ display:false},
                        title:{
                            display:true,
                            text:'WordChart',
                        }
                    }
                });


                const abc = document.getElementById('PieChart').getContext('2d');
                new Chart(abc,{
                    type: "pie",
                    data:
                    {
                        labels: Object.keys(response['words_dict']),
                        datasets:[{
                            backgroundColor : colors,
                            data: Object.values(response['words_dict']),
                        }

                    ]

                    },
                    options:{
                        title:{
                            display:true,
                            text:'Pie Chart',
                        }
                    }
                });
        })/*end of success event*/

        this.on('removedfile',function(file,response){
        /*Clear screen*/

                $('#Total_Number').text(``);
                $('#table_title').text(``);
                $('.WordsTable').css({'visibility':"hidden"});

                /*Removing previous charts*/
                $('WordChart').remove();
                $('#bar-chart-container').html( '<canvas id="WordChart"></canvas>');

                $('PieChart').remove();
                $('#pie-chart-container').html( '<canvas id="PieChart"></canvas>');
        })//end of
    }//end of init
})