# This is an in-progress version of Octopus Font/Typeface Design Testing Tool

To access it open website https://vikagrabowska.github.io/OctopusProject/

This version has bugs and functionalities in development. Please see the Issues section first.

# About & previous functional version: 

Here is a functional previous version v.095.2 https://github.com/vikagrabowska/Octopus

Octopus is font or typeface design testing tool for static and variable fonts, that runs locally in your web browser. Initially created by Viktoriya Grabowska and Szymon Marciniak, it became a public libre software project in 2024 thanks to financial support from Google Fonts. Special thanks to Eben Sorkin and Dave Crossland for making this happen. 

Octopus was made to test fonts with large design spaces more efficiently. It offer up to six different views of a variable font, all at the same time. It also allows you choose your views on or in-between masters.

Octopus is useful as a QA tool, as looking in-between masters can catch inconsistencies in your letterforms or spacing, especially interpolation problems.

Octopus is also useful for comparing your design to other designs, your roman to your italic, and so on.

Octopus can use premade texts to test into. A growing body of sample texts are available from https://github.com/SorkinType/octo-text
 
----
# Updates
### Octopus V.0.0.2

- Moved the static version of Octopus interface to the VUE framework.
- Octopus is now operational online, even on mobile devices.
  
> [!WARNING]
> The responsiveness of the page still needs refinement. On smartphones, object scaling issues are visible.
> We leave this problem for a later stage.

- Font import and application to text columns.
  
> [!note] 
> Adding a font to Octopus occurs by clicking the Add font button. Applying the font then affects all <textarea> elements, and additional GSUB and FVAR data is retrieved.
> Using Opentype.js, we fetch data directly from the file and place it in the interface. Additional data Octopus retrieves includes information about the minimum and maximum values of axes, but we still need to plan a place in the interface where they will function well.

> [!WARNING]
> Currently, font application and VF axis settings work uniformly across all columns. In Octopus, there is no separation and individualization of columns yet, allowing changes in a single text column.

- Column duplication. We added the functionality to increase the number of text columns.
- Text scrolling in all columns simultaneously.
- Real-time typing in all columns (regardless of quantity).
- Locking the pasting of styles into the text frame to ensure we are testing what we intend in the font.
- Displaying an individual management panel above each column (Font Setting, OT, VF).
- Used library: OpenType.js. Placing font data and settings in the interface:
  - Potential for using more data such as the names of defined font instances and even the maximum and minimum heights of glyphs. We have a function responsible for retrieval, selection, and application.
  - Loading VF axes – we load default values set in the font, and we can also specify axis boundary values (minValue, maxValue). Data defined as defaults fill axis settings fields after loading the font.
  - OT feature data – Octopus displays the OT features contained in the font in the interface. They appear as buttons, allowing you to enable/disable them by clicking the button.
- Modifying VF axes is now available. A new panel above each column called `ManagementPanel` serves this purpose. To display this panel, click the icon: 🌐 above each text column.
> [!WARNING]
> Currently, downloaded OT data poses a problem with setting enable/disable. This means that all OT features are defined on the text frame, but all are inactive and cannot be activated on the interface side.

## In progress
- Reconstruction of the HardWrap Panel. For technical reasons, we need to consider the application of this tool and how to separate it in the case of program operation in non-global mode.
- Using text formatting settings in columns, such as font size, spacing, etc.
- Adding text composition functionality in the column (left, center, right).

## We don't have
- Adding the ability to import for an individual text column.
> This is a matter to be considered, as it will have an impact on the planned state saving of the program.
- Loading a text file into columns.
- A local mode in Vue. A system for separating changes and modifications for each column individually.
- Improvements in responsiveness for using Octopus on much smaller screens like smartphones. Currently, it scales well to the iPad 10.5" format.
- Saving the program state.
> Plans include collecting data into a JSON file that will gather all user interface changes in the program. The issue arises with saving fonts in memory – more in issues.
- A panel that allows us to decide what information to display above the text column. (Currently, these are VF axes)
> We plan to create a selection field where you can decide on displaying VF axes, Used OT features, Font names, text formatting settings. We see the need to display even several of them at the same time. Additionally, it becomes beneficial to differentiate the displayed data in case of using a font that has multiple VF axes.

## Future
- Use color on the interface.
- Refinement of the version for small screens.
- Adding a panel where we can see the full set of data for each column in one place.
