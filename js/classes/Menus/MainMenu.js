/*
*/

// use the ERS namespace for all code
var ERS = ERS || {};


ERS.MainMenu = function() {
	ERS.Menu.apply( this, arguments ); // initialize parent's constructor
	
	this._menuRootName = "mainMenu";
};
// -- Make the MainMenu class a child of the Menu class
ERS.MainMenu.prototype = Object.create( ERS.Menu );


ERS.MainMenu.prototype.getXMLData = function() {
	// before grabbing XML data, make sure the menu knows the correct DOM elements
	this._menuDOMObject = ERS.DOM.mainMenu;
	this._menuButtonDOMObject = ERS.DOM.mainMenuButton;
	
	// call base function
	ERS.Menu.prototype.getXMLData.call( this );
};

ERS.MainMenu.prototype.parseXML = function( a_XML ) {
	// call base function
	ERS.Menu.prototype.parseXML.call( this, a_XML, "mainMenu" );
};

ERS.MainMenu.prototype.run = function( a_toggle ) {
	// call base function
	ERS.Menu.prototype.run.call( this, a_toggle );
};

ERS.MainMenu.prototype.close = function() {
	// call base function
	ERS.Menu.prototype.close.call( this );
};

ERS.MainMenu.prototype.updateMenu = function( a_screenNumber ) {
	// call base function
	ERS.Menu.prototype.updateMenu.call( this, a_screenNumber );
	
	// update this menu's items
	var screensComplete = ERS.cookie.getScreensComplete();
	var totalScreens = ERS.moduleData.getTotalScreenCount();
	var lessonScreens = ERS.moduleData.getLessonList();
	var currentScreen = 0;
	for( var i = 0; i < lessonScreens.length; i++ )
	{
		// go through each screen in this lesson, check if each is complete
		var lessonComplete = true;
		for( var j = currentScreen; j < lessonScreens[i]; j++ )
		{
			// if one screen is NOT complete, then this lesson is not complete
			if( screensComplete[currentScreen] == "false" )
			{
				lessonComplete = false;
			}
			currentScreen++;
		}
		
		// turn this menu item on/off based on the lessonComplete variable set above
		if( i >= MENU_FIRST_LESSON_NUMBER )
			this._menuItems[i-MENU_FIRST_LESSON_NUMBER].turnOn( lessonComplete );
	}
	
	// doing the last lesson separately...
	var lessonComplete = true;
	for( var i = lessonScreens[lessonScreens.length-1]; i < totalScreens; i++ )
	{
		if( screensComplete[i] == "false" )
		{
			lessonComplete = false;
			break;
		}
	}
	
	// determine if the last menu item should be on/off
	if( a_screenNumber == totalScreens-1 || lessonComplete )
		this._menuItems[this._menuItems.length-1].turnOn( true );
};