export default YamlValidatore;
declare class YamlValidatore {
    constructor(options: any);
    options: any;
    logs: any[];
    nonValidPaths: any[];
    inValidFilesCount: number;
    /**
     * Store log messages
     * possible later use by writing a log file.
     * @param {string} msg Error message
     * @returns {void}
     */
    errored(msg: string): void;
    /**
     * Check that the given structure is available.
     * @param {Object} doc Object loaded from Yaml file
     * @param {Object} structure Structure requirements
     * @param {string} parent Address in a dot notation
     * @returns {Array} List of not found structure paths
     */
    validateStructure(doc: Object, structure: Object, parent: string): any[];
    /**
     * Parse the given Yaml data.
     * @param {string} filepath Yaml file path
     * @param {string} data Yaml data
     * @returns {string|null} Parsed Yaml or null on failure
     */
    loadData(filepath: string, data: string): string | null;
    /**
     * Read and parse the given Yaml file.
     * @param {string} filepath Yaml file path
     * @returns {string|null} Parsed Yaml or null on failure
     */
    loadFile(filepath: string): string | null;
    /**
     * Read the given Yaml file, load and check its structure.
     * @param {string} filepath Yaml file path
     * @returns {number} 0 when no errors, 1 when errors.
     */
    checkFile(filepath: string): number;
    /**
     * Create a report out of this, but in reality also run.
     * @param {array} files List of files that have been checked that they exist
     * @returns {void}
     */
    validate(files: string[]): void;
    /**
     * Create a report out of this, but in reality also run.
     * @returns {number} 0 when no errors, the count of invalid files otherwise.
     */
    report(): number;
}
