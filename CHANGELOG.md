All notable changes to this project will be documented in this file.
We follow the [Semantic Versioning 2.0.0](http://semver.org/) format.


## Unreleased

### Added
- Initial repository setup.
- Capital Framework project infrastructure (including a gulp build).
- Old prototype files into new Capital Framework structure
  (temporarily; the old code will be phased out as it is
  iteratively replaced with new code).
- Installation and usage instructions to the readme.
- Capital Framework project infrastructure (including a gulp build)
- Old prototype files into new Capital Framework structure (temporarily; the old code will be phased out as it is iteratively replaced with new code)
- Installation and usage instructions to the readme
- Follow-up questions for complaints where the issue is "Problems with the mortgage servicer when you are making payments" or "Problems with the mortgage servicer when you are unable to pay"

### Changed
- Moved /source-art/ folder to project root so it doesn't get copied to /dist/.
- Updated gulp to 3.9.1.
- Updated eslint to 2.0.0.
- Normalized gulp variable and task naming.
- Moved form markup to `/src/`.
- Capital Framework project infrastructure (including a gulp build)
- Old prototype files into new Capital Framework structure (temporarily; the old code will be phased out as it is iteratively replaced with new code)
- Installation and usage instructions to the readme
- Phone number field to the form that appears when a matching company isn't found in the system in step 4

### Changed
- For debt collecction complaints, the phone number the debt collector is calling is now a separate field from the other consumer identifiers in step 4

### Deprecated
- Nothing.

### Removed
- Google Analytics references since GTM is used.

### Fixed
- Two-column lists with an odd number of items no longer spill into a
  third column.
- The question "What school did you attend when you received the loan?"
  now reads "What school were you attending when you received the loan?"
