/**
 * The base interface for any modules.
 */
export interface Module {
  /**
   * A number indicating when the module will load. Higher numbers mean that it will load before modules with lower number priorities.
   */
  priority?: number;
}

/**
 * The base interface for creating config files.
 */
export interface ConfigHandler {
  /**
   * A function that will run when any config files should be created. Do not create any config files outside of this method.
   */
  register: () => void;
}