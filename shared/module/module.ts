/**
 * The base interface for any modules.
 */
export interface Module {
  /**
   * A unique and constant identifier to allow other modules to identify this module.
   */
  identifier: string;
  /**
   * A number indicating when the module will load. Higher numbers mean that it will load before modules with lower number priorities.
   */
  priority?: number;
  /**
   * General exports to make cross-module interactions easier.
   */
  exports?: Record<string, any>;
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