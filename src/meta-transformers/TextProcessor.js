function script_to_pdf() {}
const path = require('path')
const scripts_to_single_md = require('./../transformers/scripts_to_single_md')
const mds_to_single_md = require('./../transformers/mds_to_single_md')

// many to one processes
// Process needs FOLDER_INPUT + FOLDER_OUTPUT_processed/file_output.ext
// Examples:
// combine_md_to_single: combine recursive files --> 1 file md
// combine_scripts_to_md --> combine recursive files --> 1 file md

// one to one processes
// file_path_input + file_path_output
// md_to_pdf (scripts, books etc.)
// translate single: translate_single_md -> 1 file to 1 file

// recursive to recursive files
// like one to one processes
// translate folder: translate_folder -> recursive files to recursive files

class TextProcessor {
	constructor(optionsInput, folderAnalytics, selectedProcess) {
		this.inputPath = optionsInput.inputPath
		this.rootFolder = folderAnalytics.rootFolder
		this.filterOptions = optionsInput
		this.topFiles = folderAnalytics.topFiles
		this.topFolders = folderAnalytics.files_of_root_folder
		this.recursiveFiles = folderAnalytics.recursiveFiles
		this.selectedProcess = selectedProcess
		this.Processes = {
			scripts_to_single_md: {
				folder_output_ext: '_t_script_md',
				file_output_name_ext: '_combined.md',
			},

			mds_to_single_md: {
				folder_output_ext: '_t_combined_md',
				process: mds_to_single_md,
				file_output_name: 'scripts_combined.md',
			},
		}
	}

	// 	getFolderOutput() {
	// 		return (
	// 			this.rootFolder +
	// 			this.Processes[this.selectedProcess].folder_output_ext
	// 		)
	// 	}
	//
	// 	getFileNameOutput() {
	// 		return (
	// 			this.rootFolder +
	// 			this.Processes[this.selectedProcess].folder_output_ext
	// 		)
	// 	}

	getRelativeFileOutput(original_relative_file_path) {
		return path.join(createRootFolderOutput(), original_relative_file_path)
	}
}

module.exports = TextProcessor
