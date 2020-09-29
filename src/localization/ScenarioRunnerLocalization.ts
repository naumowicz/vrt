const scenarioRunnerLocalization = {
	//error
	scenarioNotAvailable: 'Scenario was not availiable under this path: ',
	failedLoadingScenario: 'Failed parsing scenario: ',
	creatingFoldersFail: 'Creating folders for images was unsuccessfull',
	creatingBaselineFolderNotPossible:
		'Unable to create baseline folder for path: ',
	recreatingOutputAndActualStatusFolderNotPossible:
		'Unable to create actualStatus or output folder for path: ',

	//warning
	createFoldersNoImagesToAnalyze: 'Received 0 images to analyze',

	//info
	startingScenarioRunner: 'Starting scenario: ',
	runningScenario: 'Running scenario: ',
	//debug
	loadingScenario: 'Loading scenario: ',
	loadingSuccessful: 'Loading scenario was successful',
	openingPuppeteer: 'Opening puppeteer',
	runningStepsInPuppeteer: 'Running steps in a puppeteer',
	closingPuppeteer: 'Closing puppeteer',
	scenarioFinished: 'Scenario finished successfully',
	creatingFoldersSuccessful: 'Creating folders was successful',

	errorsFromParsingScenario: 'Received errors from parsing scenario',

	analyzingStep: 'Analyzing step:',
	puppeteerVisitsPage: 'Puppeteer visits page: ',
	checkingIfBaselineExists: 'Checking if baseline is available: ',
	baselineExists: 'Baseline exists',
	gettingPathToActualStatusImage: 'Getting path to actualStatus image',
	takingScreenshotForActualStatusImage:
		'Taking screenshot for actualStatus image',
	comparingActualStatusImageWithBaseline:
		'Comparing actualStatus image with baseline',
	savingOutputImage: 'Saving output image to: ',
	comparedImagesWereSameDimensions: 'Images had same dimensions: ',
	dimensionsBetweenImagesWereDifferentBy:
		' Dimensions between images were different by :',
	rawMismatchPercentageWas: 'Raw mismatch percentage equals: ',
	mismatchPercentageWas: 'Mismatch percentage equals: ',
	differenceBoundsWere: 'Difference bounds equal: ',
	baselineDoesNotExists: 'Baseline does not exists',
	takingScreenshotForBaseline: 'Creating baseline image: ',
	gettingNextImageToAnalyze: 'Going to next image to analyze',
	loadingImagesForComparisment: 'Loading images for comparisment',
	imagesForComparismentLoadedSuccessfully:
		'Images for comparisment loaded successfully',
	loadingImagesForComparismentFailed:
		'Loading images for comparisment failed',
	comparingImages: 'Comparing images',
	returningResultAfterComparisment: 'Returning images after comparisment',
	startingLoadingImagesForComparisment:
		'Starting loading images for comparisment',
	loadingOriginalImage: 'Loading original image',
	loadingOriginalImageFailed: 'Loading original image failed',
	loadingComparedImage: 'Loading compared image',
	loadingComparedImageFailed: 'Loading compared image failed',
	loadingComparedAndOriginalImageSuccessful:
		'Loading compared and original image was successful',
};

export default scenarioRunnerLocalization;
