$(document).ready(function() {
    // tombol mulai
      $('#start').click(function() {
          $('#previous').css('display','none')
          $('#previous').data('country','156')
          $('#previous').data('id','41')
          $('#next').data('country','392')
          $('#next').data('id','110')
          $('.opening').fadeOut('slow')
          var d = dataC[41];
          $('#156').attr('class','feature active')
          var bounds = path.bounds(d),
              dx = bounds[1][0] - bounds[0][0],
              dy = bounds[1][1] - bounds[0][1],
              x = (bounds[0][0] + bounds[1][0]) / 2,
              y = (bounds[0][1] + bounds[1][1]) / 2,
              scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
              translate = [width / 2 - scale * x, height / 2 - scale * y];
  
          svg.transition().duration(1000).call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) );
          getData(41)
      })
    // ambil data untuk tooltip
    $.getJSON('data.json',function(data){
      dataCountry = data;
    });
})
function move(e) {
    var country = $(e).data('country')
    var id = $(e).data('id')
    var d = dataC[id];
  
    switch (id) {
      case '41':
        // cina
        $('#previous').css('display','none')
        $('#previous').data('country','156')
        $('#previous').data('id','41')
        $('#next').data('country','392')
        $('#next').data('id','110')
        $('#next').css('display','block')
        break;
      case '110':
        // jepang
        $('#previous').css('display','block')
        $('#previous').data('country','156')
        $('#previous').data('id','41')
        $('#next').data('country','410')
        $('#next').data('id','118')
        $('#next').css('display','block')
        break;
      case '118':
        // korea selatan
        $('#previous').css('display','block')
        $('#previous').data('country','392')
        $('#previous').data('id','110')
        $('#next').data('country','702')
        $('#next').data('id','190')
        $('#next').css('display','block')
        break;
      case '190':
        // singapura
        $('#previous').css('display','block')
        $('#previous').data('country','410')
        $('#previous').data('id','118')
        $('#next').css('display','none')
        break;
    
      default:
        break;
    }
  
    $('.feature').attr('class','feature')
    active = d3.select(null);
    svg.transition().duration(1000).call( zoom.transform, d3.zoomIdentity );
    
    var bounds = path.bounds(d),
              dx = bounds[1][0] - bounds[0][0],
              dy = bounds[1][1] - bounds[0][1],
              x = (bounds[0][0] + bounds[1][0]) / 2,
              y = (bounds[0][1] + bounds[1][1]) / 2,
              scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
              translate = [width / 2 - scale * x, height / 2 - scale * y];
  
    setTimeout(function(){ 
      $('#'+country).attr('class','feature active');
      console.log(scale);
      if (id == '190') { scale = 50; translate = [width / 2 - scale * x, height / 2 - scale * y]; }
      svg.transition().duration(1000).call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) );
      getData(id)
    }, 1000);
  }
  
  function getData(idCountry) {
  
    dataFiltered =  dataCountry.filter(function(data) {
      return data.id == idCountry;
    });
    
    $('#country').html(dataFiltered[0].country);
    $('#country-title').html(dataFiltered[0].title);
    $('#country-body').html(dataFiltered[0].body);
}