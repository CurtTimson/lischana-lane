(function(){

  var flickr = {
    apiKey:"264fbe68492fe1c3e4e1696f67112bfa",
    userId:"81674685@N04"
  };

  var init = function(){

    $('.flickr-gallery').each(function(i,v){
      var $this = $(this);
      var divId = $this.attr('id');
      var flickrId = $this.data('flickrid');

      loadFlickrData(flickrId, function(data){
        bindFlickrData($this, data);
        bindGalleryLoad(divId);
      });

    });

    $('#unite-videos').unitegallery();

    trackAlbumViews();

  };

  var bindFlickrData = function($flickrGallery, data){
    for(var i=0; i<data.length; i++){
      var flickrItem = data[i];
      var $img = $('<img/>').attr({
        'alt': flickrItem.title,
        'src': flickrItem.thumbnailsrc,
        'data-image': flickrItem.imgsrc,
        'data-description': flickrItem.title
      });
      $flickrGallery.append($img);
    };
  };

  var bindGalleryLoad = function(flickrGalleryId){
    $('#' + flickrGalleryId).unitegallery();
  };

  var loadFlickrData = function(flickrId, callback){
    var flickrUrl = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos"
                    + "&api_key=" + flickr.apiKey
                    + "&photoset_id=" + flickrId
                    + "&user_id=" + flickr.userId
                    + "&extras=url_m%2C+url_o"
                    + "&format=json"
                    + "&nojsoncallback=1";

    $.get(flickrUrl, function(r) {
      var flickrItems = mapPhotoJsonToModel(r.photoset.photo);
      callback(flickrItems);
    });

  };

  var mapPhotoJsonToModel = function(data){
    var photos = [];
    data.map(function(i,v){
      photos.push({
        title: i.title,
        thumbnailsrc: i.url_m,
        imgsrc:i.url_o
      });
    });
    return photos;
  };

  var trackAlbumViews = function(){
    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
      var $this = $(this);
      var projectName = $this.find('.project-name').text().trim();
      ga('send', 'event', 'Project', 'Open', projectName);
    });

  }


  $(function(){
    init();
  });

})();
