'use strict';

angular.
module('rfDataSubmit').
component('rfDataSubmit', {
  templateUrl: 'views/index.html',
  controller: ['$document', '$location', '$timeout', 'rfData',
          function DataSubmitController($document, $location, $timeout, rfData) {
    // Get access to this scope to use within function scope.
    var self = this;

    // Adds the business service's scope to this controller.
    this.data = rfData;

    // Stores all possible paths to view partials
    this.partialViews = [
      'views/analysis-type.template.html',
      'views/regression-form.template.html',
      'views/cluster-form.template.html',
      'views/file-submit.template.html',
      'views/image-view.template.html'
    ];

    // Stores index of current view partial
    this.partialViewSelection = 0;

    // Used to get path to current view partial
    this.getPartial = function() {
      return this.partialViews[this.partialViewSelection];
    }

    // Used to trigger a change in view partials
    this.updatePartialView = function(viewType, valid) {
      if (valid) {
        switch (viewType) {
          case 'analysis-type':
            this.partialViewSelection = 0;
            break;
          case 'regression':
            this.partialViewSelection = 1;
            break;
          case 'cluster':
            this.partialViewSelection = 2;
            break;
          case 'file-submit':
            this.partialViewSelection = 3;
            break;
           case 'image-view':
           	this.partialViewSelection = 4;
            break;
          default:
            this.partialViewSelection = 0;
        }
      }
    }

    // Called when a new partial has loaded
    this.partialLoaded = function() {
      // Reset scroll position when switching partials
      window.scrollTo(0, 0);

      switch (this.partialViewSelection) {
        case 0:
          this.analysisPartialLoaded();
          break;
        case 1:
          this.regressionPartialLoaded();
          break;
        case 2:
          this.clusterPartialLoaded();
          break;
        case 3:
          this.fileSubmitPartialLoaded();
          break;
         case 4:
          this.imageViewPartialLoaded();
          break;
        default:
          // Do nothing
      }
    }

    this.analysisPartialLoaded = function() {
    }

    this.regressionPartialLoaded = function() {
    }

    this.clusterPartialLoaded = function() {
    }

    this.fileSubmitPartialLoaded = function() {
      // Add any required skills functionality here.
    }

    this.imageViewPartialLoaded = function() {
      // Add any required skills functionality here.
    }

    this.compareViewSelection = function(partialViewValue) {
      return angular.equals(this.partialViewSelection, partialViewValue);
    }

    // Because the first partial is not dynamically loaded when the
    // page first loads, the `partialLoaded` function is not called
    // This block triggers the setup of the first instance of the first
    // partial when angular finishes loading the page
    var ctrl = this;
    $document.ready(ctrl.partialLoaded());

    this.createBusiness = function(valid) {
      if (valid) {
        // TODO: Add business user create function.
        $location.path('/business/created');
      }
    }
  }]
});
