$(document).ready(function(){
  $('.scanQROpen').click(function(){
    let scanner = new Instascan.Scanner(
        {
            video: document.getElementById('preview')
        }
    );
    scanner.addListener('scan', function(content) {
        $('#scanningCompleted').html('<div class="alert alert-success text-center" role="alert"><h4>Scanning Completed <a href="/createSession/'+content+'" class="btn btn-success">Go To Menu</a></h4></div>').show();
        $('.scanningCompletedMenu').show();
    });
    Instascan.Camera.getCameras().then(cameras =>
    {
        if(cameras.length > 0){
            scanner.start(cameras[0]);
        } else {
            console.error("Please enable Camera!");
        }
    });
    $('#scanQROpenDiv ').modal('show');
  });
});
