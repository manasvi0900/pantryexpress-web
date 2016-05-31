'use strict';

/**
 * @ngdoc function
 * @name pantyexpressApp.controller:HouseholdCtrl
 * @description
 * # HouseholdCtrl
 * Controller of the pantyexpressApp
 */
angular.module('pantyexpressApp')
  .controller('HouseholdCtrl', function ($scope, $rootScope, $location, $routeParams, api, ngDialog) {

    $scope.setview = function(name)
    {
      if(name === 'edit')
      {
        $scope.template = $scope.templates['edit'];
        $scope.template.init();
      }
      if(name === 'find')
      {
        $scope.template = $scope.templates['find'];
        $scope.template.init();
      }
      if(name === 'new')
      {
        $scope.template = $scope.templates['new'];
        $scope.template.init();
      }
      if(name === 'move')
      {
        $scope.template = $scope.templates['move'];
        $scope.template.init();
      }
       if(name === 'add')
      {
        $scope.template = $scope.templates['add'];
        $scope.template.init();
      }
       if(name === 'addmember')
      {
        $scope.template = $scope.templates['addmember'];
        $scope.template.init();
      }
      if(name === 'editmember')
      {
        $scope.template = $scope.templates['editmember'];
        $scope.template.init();
      }
      if(name === 'newservice')
      {
        $scope.template = $scope.templates['newservice'];
        $scope.template.init();
      }
      if(name === 'newser2')
      {
        $scope.template = $scope.templates['newser2'];
        $scope.template.init();
      }
      if(name === 'MainNewService')
      {
        $scope.template = $scope.templates['MainNewService'];
        $scope.template.init();
      }
      if(name === null)
      {
        $scope.template = $scope.templates['find'];
        $scope.template.init();
      }
    }
    var viewname = ($routeParams.householdview);
    console.log('HouseholdCtrl:' + viewname);
    var currentIndex = 0;

    // Define various page templates within a templates object map
    $scope.templates = {};
    $scope.templates['edit'] = {
      name: 'Edit Household',
      url: 'views/households/edithousehold.html',
      visible: true,
      init: function() {
        // Check if a household was previously selected; If not, redirect to find page
        if (!$rootScope.selectedHousehold || !$rootScope.selectedHousehold.householdId || $rootScope.selectedHousehold.householdId == "") {
          $location.url('/households/find');
        }

        if ($rootScope.selectedHousehold && $rootScope.selectedHousehold.householdId) {
          console.log("Selected Household ID: ", $rootScope.selectedHousehold.householdId);
          getHousehold();
        } else {
          console.log("Selected Household ID: Undefined");
        }
        if ($rootScope.selectedHousehold && $rootScope.selectedHousehold.householdId) {
          getHouseholdMembers();
        }
      }
    };

    //default to today's date
    $scope.todayDate = new Date();

    $scope.householdsFilter = {};
    $scope.household = {};
    $scope.households = [];
    $scope.members = [];
    $scope.householdMembers = [];
    $scope.member = {
      isDisabled: false,
      isHispanic: false,
      isSpecialNeeds: false,
      memberType: "householdMember",
      validationDate: new Date()
    };
    $scope.servicesEligibility = [];
    $scope.servicesList = [];
    $scope.servicesSelected = {};
    $scope.householdMembersSelected = {};
    $scope.servicesCreateRequest = {};
    $scope.servicesCreateRequest.householdMembersServed = {};
    $scope.servicesCreateRequest.householdMembersServed.items = [];
    $scope.servicesCreateRequest.servicesRendered = {};
    $scope.servicesCreateRequest.servicesRendered.items = [];
    $scope.dateSelected = { time: new Date() };
    $scope.timeOfServiceISOFormat = $scope.dateSelected.time;

    $scope.templates['new'] = {
      name: 'New Household',
      url: 'views/households/create/householdcreateinfo.html',
      visible: true,
      init: function() {
        $location.url('/households/create');
      }
    };
    $scope.templates['find'] = {
      name: 'Find Household',
      url: 'views/households/findhousehold.html',
      visible: true,
      init: function() {
        $location.url('/households/find');
      }
    };
    $scope.templates['move'] = {
      name: 'Move Household Member',
      url: 'views/households/movehousehold.html',
      visible: true,
      init: function() {}
    };
    $scope.templates['editmember'] = {
      name: 'Edit Household Member',
      url: 'views/households/householdmemberinfo.html',
      visible: true,
      init: function() {
        // Check if a member was previously selected; If not, redirect to find page
        if (!$rootScope.selectedHouseholdMember || !$rootScope.selectedHouseholdMember.memberId || !$rootScope.selectedHouseholdMember.memberId === "") {
          $location.url('/households/edit');
        }

        if ($rootScope.selectedHouseholdMember && $rootScope.selectedHouseholdMember.memberId) {
          console.log("Selected Member ID: ", $rootScope.selectedHouseholdMember.memberId);
          getSelectedHouseholdMember();
        } else {
          console.log("Selected Member ID: Undefined");
        }

        if ($rootScope.selectedHouseholdMember && $rootScope.selectedHouseholdMember.memberId) {
          getSelectedHouseholdMember();
        }

      }
    };
    $scope.templates['addmember'] = {
      name: 'Add Household Member',
      url: 'views/households/addhouseholdmember.html',
      visible: true,
      init: function() {}
    };
    $scope.templates['newservice'] = {
      name: 'New Service',
      url: 'views/households/newservice.html',
      visible: true,
      init: function () {
      }
    };
    $scope.templates['newser2'] = {
      name: 'New Service2',
      url: 'views/households/newser2.html',
      visible: true,
      init: function () {
      }
    };
    $scope.templates['MainNewService'] = {
      name: 'Main New Service',
      url: 'views/households/MainNewService.html',
      visible: true,
      init: function() {
        console.log("StartMainServiceInit");
        if (!$rootScope.selectedHousehold || !$rootScope.selectedHousehold.householdId) {
          console.log("Inside: !$rootScope.selectedHousehold || !$rootScope.selectedHousehold.householdId");
          $location.url('/households/find');
        }

        if ($rootScope.selectedHousehold && $rootScope.selectedHousehold.householdId) {
          console.log("Selected Household ID: ", $rootScope.selectedHousehold.householdId);
          setTimeOfService();
          initializeCreateServicePage();
        } else {
          console.log("Selected Household ID: Undefined");
          console.log("Service page initialization failed");
        }
        console.log("EndMainServiceInit");
      }
    };

    function initializeCreateServicePage() {
      $scope.servicesSelected = {};
      $scope.householdMembersSelected = {};
      $scope.servicesList = [];
      $scope.servicesCreateRequest = {};
      $scope.servicesCreateRequest.householdMembersServed = {};
      $scope.servicesCreateRequest.householdMembersServed.items = [];
      $scope.servicesCreateRequest.servicesRendered = {};
      $scope.servicesCreateRequest.servicesRendered.items = [];
      getServicesEligibility();
      getHousehold();
      getHouseholdMembers();
      listServices();
    };

    $scope.pages = [
        $scope.templates['find'],
        $scope.templates['new']
    ];


    $scope.template = $scope.pages[currentIndex];

    $scope.newHousehold= function () {
      $location.path('views/households/newhousehold.html');
      $location.url('/households/create');
    };
    $scope.addHouseholdMember= function () {
      $location.url('/households/addmember');
    };
    $scope.editHousehold= function () {
      $location.url('/households/edit');
    };
    $scope.findHousehold = function() {
      $location.url('/households/find');
    }
    $scope.newService= function () {
      $location.url('/households/MainNewService');
    };
    $scope.editHouseholdMember= function () {
      $location.url('/households/editmember');
    };
    $scope.cancel = function(){
      $location.url('/households/find')
    }
    $scope.cancelUpdtaeMember = function(){
      $location.url('/households/edit')
    }

    $scope.setview(viewname);
    $scope.goto = function (targetIndex){
      currentIndex = targetIndex;
      $scope.template = $scope.pages[currentIndex];
      $scope.template.init();
    }
    $scope.next = function (){
      currentIndex++;
      $scope.goto(currentIndex);
      $scope.template.init();
    }

    $scope.isReadOnly = function() {
      $scope.req.pantry = "isReadOnly";
      $scope.member = "isReadOnly";
    };

    $scope.clearSearch = function () {
      $scope.searchAll = "";
    };

    $scope.findHouseholds = function (){
      listFilteredHouseholds();
    };

    $scope.getHouseholdMember = function (){
      getSelectedHouseholdMember();
    };

    $scope.saveHousehold = function (){
      putHousehold();
    };

    function getHousehold() {
      // Call get household operation via API service
      console.log("HouseholdsGet Household ID: ", $rootScope.selectedHousehold.householdId );
      console.log("HouseholdsGet Pantry ID: ", $rootScope.selectedPantry.id  );
      api.getPantriesByPantryIdHouseholdsByHouseholdId({ householdId: $rootScope.selectedHousehold.householdId, pantryId: $rootScope.selectedPantry.id }).then(function (data){
      $scope.household = data;
      $scope.household.validationDate = new Date($scope.household.validationDate);
      console.log('HouseholdsGet Response: ', $scope.household);
      $scope.servicesCreateRequest.personPresentFirstName = data.headOfHousehold.firstName;
      },function(err){
        console.error('HouseholdsGet Error', err);
        // TODO: Add error handling here
      });
    }

    function putHousehold(){
      console.log("HouseholdsPut Household ID: ", $rootScope.selectedHousehold.householdId );
      console.log("HouseholdsPut Pantry ID: ", $rootScope.selectedPantry.id  );
      api.putPantriesByPantryIdHouseholdsByHouseholdId({ householdId: $rootScope.selectedHousehold.householdId, pantryId: $rootScope.selectedPantry.id, Household: $rootScope.selectedHousehold }).then(function (data){
        $rootScope.household = data;
        console.log('HouseholdsPut Response: ', $scope.household, data);
      },function(err){
        console.error('HouseholdsPut Error', err);
        // TODO: Add error handling here
      });

    }

    function listHouseholds() {
      // Call list households operation via API service
      console.log("HouseholdsList Pantry ID: ", $rootScope.selectedPantry.id );
      api.getPantriesByPantryIdHouseholds({ pantryId: $rootScope.selectedPantry.id }).then(function (data){
        $scope.households = data.items;
        console.log('HouseholdsList Response: ', $scope.households);
      }, function(err){
        console.error('HouseholdsList Error', err);
        // TODO: Add error handling here
      });
    }

    function listFilteredHouseholds() {
      // Build filter object
      var filterCriteria = { pantryId: $rootScope.selectedPantry.id };
      console.log("HouseholdsFilter Object", $scope.householdsFilter);
      for (var filter in $scope.householdsFilter) {
        filterCriteria[filter] = $scope.householdsFilter[filter];
      }
      console.log("HouseholdsList Filter", filterCriteria);
      // Call list households operation via API service using filter criteria
      api.getPantriesByPantryIdHouseholds(filterCriteria).then(function (data){
        $scope.households = data.items;
        console.log('HouseholdsList Response: ', $scope.households);
      }, function(err){
        console.error('HouseholdsList Error', err);
        // TODO: Add error handling here
      });
    }

    $scope.setSelectedHousehold = function(household) {
      $rootScope.selectedHousehold = household;
      console.log("Selected Household updated to: ", household.householdId);
    };

    function getHouseholdMembers() {
      //call get householdMember operation via API service
      console.log("HouseholdMembersList Household ID: ", $rootScope.selectedHousehold.householdId );
      console.log("HouseholdMembersList Pantry ID: ", $rootScope.selectedPantry.id  );
      api.getPantriesByPantryIdHouseholdsByHouseholdIdMembers({ householdId: $rootScope.selectedHousehold.householdId, pantryId: $rootScope.selectedPantry.id }).then(function (data) {
        $scope.householdMembers = data.items;
        for (var i = 0; i < $scope.householdMembers.length; i++) {
          $scope.householdMembers[i].age = calculateAge(new Date($scope.householdMembers[i].birthday));
        }
        console.log('HouseholdMembersList Response: ', $scope.householdMembers);

      },function(err){
        console.error('HouseholdMembersList Error', err);
        // TODO: Add error handling here
      });
    }

    function putHouseholdMembers() {
      //call put householdMember operation via API service
      console.log("HouseholdMembersList Household ID: ", $rootScope.selectedHousehold.householdId );
      console.log("HouseholdMembersList Pantry ID: ", $rootScope.selectedPantry.id  );
      api.putPantriesByPantryIdHouseholdsByHouseholdIdMembers({ householdId: $rootScope.selectedHousehold.householdId, pantryId: $rootScope.selectedPantry.id }).then(function (data) {
        $scope.householdMembers = data.items;
        console.log('HouseholdMembersList Response: ', $scope.householdMembers);

      },function(err){
        console.error('HouseholdMembersList Error', err);
        // TODO: Add error handling here
      });
    }


    var getHouseholdMemberType = function (memberId) {
      if ($rootScope.selectedHousehold.householdId === memberId) {
        return "headOfHousehold"
      } else {
        return "householdMember"
      }
    };

    function calculateAge(birthDate) { // birthday is a date
      var ageDifMs = Date.now() - birthDate.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    $scope.setSelectedHouseholdMember = function(member){
      $rootScope.selectedHouseholdMember = member;
      console.log("Selected Member updated to: ", member.memberId);
    };

    function getSelectedHouseholdMember(){
      console.log("HouseholdMemberGet Household ID: ", $rootScope.selectedHousehold.householdId );
      console.log("HouseholdMemberGet Pantry ID: ", $rootScope.selectedPantry.id  );
      api.getPantriesByPantryIdHouseholdsByHouseholdIdMembersByMemberId({ householdId: $rootScope.selectedHousehold.householdId, pantryId: $rootScope.selectedPantry.id, memberId: $rootScope.selectedHouseholdMember.memberId}).then(function (data) {
        $scope.member = data;
        $scope.member.birthday = new Date($scope.member.birthday);
        $scope.member.validationDate = new Date($scope.member.validationDate);
        console.log('HouseholdMemberGet Response: ', $scope.member);

      },function(err){
        console.error('HouseholdMemberGet Error', err);
        // TODO: Add error handling here
      });
    }

    $scope.resetCreateServicePage = function() {
      $scope.dateSelected.time = new Date();
      setTimeOfService();
      initializeCreateServicePage();
    };

    $scope.resetServiceSelections = function() {
      setTimeOfService();
      initializeCreateServicePage();
    };

    function setTimeOfService() {
      $scope.timeOfServiceISOFormat = $scope.dateSelected.time.toISOString();
      console.log("timeOfService set to: ", $scope.timeOfServiceISOFormat);
    };

    function getServicesEligibility() {
      console.log("ServicesEligibilityList Pantry ID: ", $rootScope.selectedPantry.id);
      console.log("ServicesEligibilityList Household ID: ", $rootScope.selectedHousehold.householdId);

      api.getPantriesByPantryIdHouseholdsByHouseholdIdServiceseligibility({ timeOfService: $scope.timeOfServiceISOFormat, householdId: $rootScope.selectedHousehold.householdId, pantryId: $rootScope.selectedPantry.id }).then(function (data) {
        $scope.servicesEligibility = data.items;
        console.log("ServicesEligibilityList Response: ", data.items);
      }, function(err) {
        console.error("ServicesEligibilityList Error: ", err);
      });
    };

    function isValidNumber(entry) {
      return !isNaN(parseInt(entry)) && isFinite(entry);
    }

    $scope.servicesCreateError = null;

    $scope.calculateServicePounds = function() {
      // Count number of selected household members
      var familySize = 0;
      for (var selection in $scope.householdMembersSelected) {
        if ($scope.householdMembersSelected.hasOwnProperty(selection)) {
          if ($scope.householdMembersSelected[selection] === true) {
            familySize++;
          }
        }
      }

      // Calculate pounds for every selected service
      for (var selection in $scope.servicesSelected) {
        if ($scope.servicesSelected.hasOwnProperty(selection)) {
          var numberPounds = 0;
          if ($scope.servicesSelected[selection].selected === true) {
            for (var svc in $scope.servicesEligibility) {
              if ($scope.servicesEligibility.hasOwnProperty(svc)) {
                var service = $scope.servicesEligibility[svc];
                if (service.serviceConfigId === selection) {
                  // Add number of pounds for up to first 10 family members
                  if (familySize >= 1 && familySize <= 10) {
                    var familySizePoundsKey = "numberPoundsFamilySize" + familySize.toString();
                    numberPounds += service[familySizePoundsKey];
                  }
                  if (familySize > 10) {
                    // Calculate pounds for first 10 members
                    var familySizePoundsKey = "numberPoundsFamilySize10";
                    numberPounds += service[familySizePoundsKey];

                    // Calculate subsequent pounds for additional family members
                    var deltaSize = familySize - 10;
                    var deltaPounds = deltaSize * service.numberPoundsFamilySizeDelta;
                    numberPounds += deltaPounds;
                  }

                  // Set number of pounds to service attribute
                  $scope.servicesSelected[selection].servicePounds = numberPounds;
                }
              }
            }
          }
        }
      }

      console.log("Services Selected: ", $scope.servicesSelected);
      console.log("Household Members Selected: ", $scope.householdMembersSelected);
      console.log("Services Eligibility Object" , $scope.servicesEligibility);
    }

    $scope.createService = function() {
      console.log("householdMembersSelected: ", $scope.householdMembersSelected);
      console.log("servicesSelected: ", $scope.servicesSelected);

      // Clear any pre-existing errors
      $scope.servicesCreateError = null;

      // Initialize counters for service statistics recording
      var disabledCount = 0;
      var hispanicCount = 0;
      var specialNeedsCount = 0;
      var genderFemaleCount = 0;
      var genderMaleCount = 0;
      var genderOtherCount = 0;
      var numberPoundsFullService = 0;
      var numberPoundsSupplemental = 0;
      var numberPoundsEFAP = 0;
      var numberPoundsNonFood = 0;
      var numberPoundsBaby = 0;
      var numberPoundsOther = 0;

      // Capture all household members selected
      for (var selection in $scope.householdMembersSelected) {
        if ($scope.householdMembersSelected.hasOwnProperty(selection)) {
          for (var i in $scope.householdMembers) {
            var member = $scope.householdMembers[i];
            if (member.memberId === selection && $scope.householdMembersSelected[selection] === true) {
              var tmpMember = {
                memberId: member.memberId,
                age: member.age,
                gender: member.gender,
                race: member.race,
                isDisabled: member.isDisabled,
                isHispanic: member.isHispanic,
                isSpecialNeeds: member.isSpecialNeeds
              }
              // Check if member is already present in household members served array
              var memberIncluded = false;
              for (var i = 0; i < $scope.servicesCreateRequest.householdMembersServed.items.length; i++) {
                if ($scope.servicesCreateRequest.householdMembersServed.items[i].memberId === tmpMember.memberId) {
                  memberIncluded = true;
                }
              }

              // Add member to array and increment counters
              if (memberIncluded === false) {
                $scope.servicesCreateRequest.householdMembersServed.items.push(tmpMember);
                if (tmpMember.isDisabled) { disabledCount++ };
                if (tmpMember.isHispanic) { hispanicCount++ };
                if (tmpMember.isSpecialNeeds) { specialNeedsCount++ };
                if (tmpMember.gender === "Male") { genderMaleCount++ };
                if (tmpMember.gender === "Female") { genderFemaleCount++ };
                if (tmpMember.gender === "Other") { genderOtherCount++ };
              }
            }
          }
        }
      };

      // Capture all services to be rendered and the pounds provided
      for (var selection in $scope.servicesSelected) {
        if ($scope.servicesSelected.hasOwnProperty(selection)) {
          for (var i in $scope.servicesEligibility) {
            var service = $scope.servicesEligibility[i];
            if (service.serviceConfigId === selection && $scope.servicesSelected[selection].selected === true) {
              // Validation that for any selected service, pounds are not null
              if (!$scope.servicesSelected[selection].servicePounds) {
                $scope.servicesCreateError = "Service pounds must be provided for all selected services";
                return;
              }
              if (isValidNumber($scope.servicesSelected[selection].servicePounds) === false) {
                $scope.servicesCreateError = "Service pounds must be provided for all selected services";
                return;
              }
              var tmpService = {
                serviceId: service.serviceConfigId,
                serviceName: service.serviceName,
                serviceType: service.serviceType,
                servicePounds: parseInt($scope.servicesSelected[selection].servicePounds)
              }

              // Check if service is already present in services rendered array
              var serviceIncluded = false;
              for (var i = 0; i < $scope.servicesCreateRequest.servicesRendered.items.length; i++) {
                if ($scope.servicesCreateRequest.servicesRendered.items[i].serviceId === tmpMember.serviceId) {
                  serviceIncluded = true;
                }
              }

              // Add service to array and increment counters
              if (memberIncluded === false) {
                $scope.servicesCreateRequest.servicesRendered.items.push(tmpService);
                if (tmpService.serviceType === "Full" ) { numberPoundsFullService += tmpService.servicePounds };
                if (tmpService.serviceType === "Supplemental" ) { numberPoundsSupplemental += tmpService.servicePounds };
                if (tmpService.serviceType === "EFAP" ) { numberPoundsEFAP += tmpService.servicePounds };
                if (tmpService.serviceType === "Non-food" ) { numberPoundsNonFood += tmpService.servicePounds };
                if (tmpService.serviceType === "Baby" ) { numberPoundsBaby += tmpService.servicePounds };
                if (tmpService.serviceType === "Other" ) { numberPoundsOther += tmpService.servicePounds };
              }
            }
          }
        }
      }

      // Add validation that at least one household member and at least one service is selected
      if ($scope.servicesCreateRequest.householdMembersServed.items.length === 0) {
        $scope.servicesCreateError = "At least one household member must be selected to create a new service";
        return;
      }
      if ($scope.servicesCreateRequest.servicesRendered.items.length === 0) {
        $scope.servicesCreateError = "At least one service/disbursement must be selected to create a new service";
        return;
      }

      $scope.servicesCreateRequest.pantryId = $rootScope.selectedPantry.id;
      $scope.servicesCreateRequest.householdId = $rootScope.selectedHousehold.householdId;
      $scope.servicesCreateRequest.timeOfService = $scope.timeOfServiceISOFormat;
      $scope.servicesCreateRequest.householdNumber = $rootScope.selectedHousehold.householdNumber;
      $scope.servicesCreateRequest.householdCity = $rootScope.selectedHousehold.physicalAddress.city;
      $scope.servicesCreateRequest.householdZip = $rootScope.selectedHousehold.physicalAddress.zip;
      $scope.servicesCreateRequest.hudCategory = $rootScope.selectedHousehold.hudCategory;
      $scope.servicesCreateRequest.transportationType = $rootScope.selectedHousehold.transportationType;
      $scope.servicesCreateRequest.headOfHouseholdGender = $rootScope.selectedHousehold.headOfHousehold.gender;
      $scope.servicesCreateRequest.isHomeless = $rootScope.selectedHousehold.isHomeless;
      $scope.servicesCreateRequest.isInCityLimits = $rootScope.selectedHousehold.isInCityLimits;
      $scope.servicesCreateRequest.isSingleParentHousehold = $rootScope.selectedHousehold.isSingleParentHousehold;

      $scope.servicesCreateRequest.disabledCount = disabledCount;
      $scope.servicesCreateRequest.hispanicCount = hispanicCount;
      $scope.servicesCreateRequest.specialNeedsCount = specialNeedsCount;
      $scope.servicesCreateRequest.genderMaleCount = genderMaleCount;
      $scope.servicesCreateRequest.genderFemaleCount = genderFemaleCount;
      $scope.servicesCreateRequest.genderOtherCount = genderOtherCount;
      $scope.servicesCreateRequest.numberPoundsFullService = numberPoundsFullService;
      $scope.servicesCreateRequest.numberPoundsEFAP = numberPoundsEFAP;
      $scope.servicesCreateRequest.numberPoundsSupplemental = numberPoundsSupplemental;
      $scope.servicesCreateRequest.numberPoundsNonFood = numberPoundsNonFood;
      $scope.servicesCreateRequest.numberPoundsBaby = numberPoundsBaby;
      $scope.servicesCreateRequest.numberPoundsOther = numberPoundsOther;

      console.log("ServicesCreate Request: ", $scope.servicesCreateRequest);
      api.postPantriesByPantryIdHouseholdsByHouseholdIdServices({
        householdId: $scope.servicesCreateRequest.householdId,
        pantryId: $scope.servicesCreateRequest.pantryId,
        Service: $scope.servicesCreateRequest
      }).then(function (data) {
        console.log("ServicesCreate Response: ", data);
        $scope.findHousehold();
        ngDialog.open({
          template:'\
                  <p>Service Successfully Created</p>\
                  <div class="ngdialog-buttons">\
                      <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog()">OK</button>\
                  </div>',
          plain: true,
          showClose: false,
          closeByEscape: false
        });
        listServices();
        //$scope.findHousehold();

      }, function (err) {
        console.log("ServicesCreate Error: ", err);
      });
    };

    $scope.saveNewHouseholdMember = function() {
      api.postPantriesByPantryIdHouseholdsByHouseholdIdMembers({householdId: $rootScope.selectedHousehold.householdId, pantryId: $rootScope.selectedPantry.id, HouseholdMember: $scope.member}).then(function (data) {
        $scope.editHousehold();
        console.log("HouseholdMembersCreate Response: ", data);
      }, function (err) {
        console.log("HouseholdMembersCreate Error: ", err);
      });
    };

    $scope.saveExistingHouseholdMember = function() {
      api.putPantriesByPantryIdHouseholdsByHouseholdIdMembersByMemberId({memberId: $rootScope.selectedHouseholdMember.memberId, householdId: $rootScope.selectedHousehold.householdId, pantryId: $rootScope.selectedPantry.id, HouseholdMember: $scope.member}).then(function (data) {
        $scope.editHousehold();
        console.log("HouseholdMembersUpdate Response: ", data);
      }, function (err) {
        console.log("HouseholdMembersUpdate Error: ", err);
      });
    };

    function listServices() {
      api.getPantriesByPantryIdHouseholdsByHouseholdIdServices({householdId: $rootScope.selectedHousehold.householdId, pantryId: $rootScope.selectedPantry.id}).then(function (data) {
        $scope.servicesList = data.items;
        console.log("ServicesList Response: ", $scope.servicesList);
      }, function (err) {
        console.log("ServicesList Error: ", err);
      });
    };

  });
