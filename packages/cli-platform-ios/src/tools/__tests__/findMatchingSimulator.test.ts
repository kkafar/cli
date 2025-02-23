/**
 * /**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import findMatchingSimulator from '../findMatchingSimulator';

jest.dontMock('../findMatchingSimulator');

describe('findMatchingSimulator', () => {
  it('should find simulator', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-9-2': [
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 4s',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 5',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
            ],
          },
        },
        {simulator: 'iPhone 6'},
      ),
    ).toEqual({
      udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
      name: 'iPhone 6',
      booted: false,
      version: 'iOS 9.2',
    });
  });

  it('should find simulator with new xcrun format', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-12-1': [
              {
                state: 'Shutdown',
                isAvailable: true,
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
              {
                state: 'Shutdown',
                isAvailable: true,
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                isAvailable: true,
                name: 'iPhone XS Max',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
                availabilityError: '',
              },
              {
                state: 'Shutdown',
                isAvailable: true,
                name: 'iPad Air',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
                availabilityError: '',
              },
              {
                state: 'Shutdown',
                isAvailable: true,
                name: 'iPad (5th generation)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
                availabilityError: '',
              },
            ],
          },
        },
        {simulator: 'iPhone 6'},
      ),
    ).toEqual({
      udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
      name: 'iPhone 6',
      booted: false,
      version: 'iOS 12.1',
    });
  });

  it('should return null if no simulators available', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-9-2': [
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 4s',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
              },
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 5',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
              },
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 6 (Plus)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
              },
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
            ],
          },
        },
        {simulator: 'iPhone 6'},
      ),
    ).toEqual(null);
  });

  it('should return the first simulator in list if none is defined', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-9-2': [
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 4s',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 5',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
              },
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
            ],
          },
        },
        null,
      ),
    ).toEqual({
      udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
      name: 'iPhone 5',
      booted: false,
      version: 'iOS 9.2',
    });
  });

  it('should return the first simulator with the correct version in list if none is defined', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-9-2': [
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 4s',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 5',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
              },
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
            ],
            'com.apple.CoreSimulator.SimRuntime.iOS-10-0': [
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: '2FF48AE5-CC3B-4C80-8D25-48966A6BE2C0',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '841E33FE-E8A1-4B65-9FF8-6EAA6442A3FC',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6s',
                udid: 'CBBB8FB8-77AB-49A9-8297-4CCFE3189C22',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 7',
                udid: '3A409DC5-5188-42A6-8598-3AA6F34607A5',
              },
            ],
          },
        },
        null,
      ),
    ).toEqual({
      udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
      name: 'iPhone 5',
      booted: false,
      version: 'iOS 9.2',
    });
  });

  it('should return the booted simulator in list if none is defined', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-9-2': [
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 4s',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 5',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
              },
              {
                state: 'Booted',
                availability: '(available)',
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
            ],
          },
        },
        null,
      ),
    ).toEqual({
      udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
      name: 'iPhone 6s',
      booted: true,
      version: 'iOS 9.2',
    });
  });

  it('should return the defined simulator in list even if another device is booted', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-9-2': [
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 4s',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 5',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
              },
              {
                state: 'Booted',
                availability: '(available)',
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
            ],
          },
        },
        {simulator: 'iPhone 6'},
      ),
    ).toEqual({
      udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
      name: 'iPhone 6',
      booted: false,
      version: 'iOS 9.2',
    });
  });

  it('should return the booted simulator in list if none is defined (multi ios versions)', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-9-2': [
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 4s',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 5',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
            ],
            'com.apple.CoreSimulator.SimRuntime.iOS-10-0': [
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: '2FF48AE5-CC3B-4C80-8D25-48966A6BE2C0',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '841E33FE-E8A1-4B65-9FF8-6EAA6442A3FC',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6s',
                udid: 'CBBB8FB8-77AB-49A9-8297-4CCFE3189C22',
              },
              {
                state: 'Booted',
                availability: '(available)',
                name: 'iPhone 7',
                udid: '3A409DC5-5188-42A6-8598-3AA6F34607A5',
              },
            ],
          },
        },
        null,
      ),
    ).toEqual({
      udid: '3A409DC5-5188-42A6-8598-3AA6F34607A5',
      name: 'iPhone 7',
      booted: true,
      version: 'iOS 10.0',
    });
  });

  it('should return the defined simulator in list even if another device is booted (multi ios versions)', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-9-2': [
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 4s',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 5',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
            ],
            'com.apple.CoreSimulator.SimRuntime.iOS-10-0': [
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: '2FF48AE5-CC3B-4C80-8D25-48966A6BE2C0',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '841E33FE-E8A1-4B65-9FF8-6EAA6442A3FC',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6s',
                udid: 'CBBB8FB8-77AB-49A9-8297-4CCFE3189C22',
              },
              {
                state: 'Booted',
                availability: '(available)',
                name: 'iPhone 7',
                udid: '3A409DC5-5188-42A6-8598-3AA6F34607A5',
              },
            ],
          },
        },
        {simulator: 'iPhone 6s'},
      ),
    ).toEqual({
      udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
      name: 'iPhone 6s',
      booted: false,
      version: 'iOS 9.2',
    });
  });

  it('should return the simulator with the specified version (multi ios versions)', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-9-2': [
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 4s',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 5',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
            ],
            'com.apple.CoreSimulator.SimRuntime.iOS-10-0': [
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: '2FF48AE5-CC3B-4C80-8D25-48966A6BE2C0',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '841E33FE-E8A1-4B65-9FF8-6EAA6442A3FC',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6s',
                udid: 'CBBB8FB8-77AB-49A9-8297-4CCFE3189C22',
              },
              {
                state: 'Booted',
                availability: '(available)',
                name: 'iPhone 7',
                udid: '3A409DC5-5188-42A6-8598-3AA6F34607A5',
              },
            ],
          },
        },
        {simulator: 'iPhone 6s (10.0)'},
      ),
    ).toEqual({
      udid: 'CBBB8FB8-77AB-49A9-8297-4CCFE3189C22',
      name: 'iPhone 6s',
      booted: false,
      version: 'iOS 10.0',
    });
  });

  it('should return null if the version is specified and no device with the exact version exists (multi ios versions)', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-9-2': [
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 4s',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 5',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
            ],
            'com.apple.CoreSimulator.SimRuntime.iOS-10-0': [
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: '2FF48AE5-CC3B-4C80-8D25-48966A6BE2C0',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '841E33FE-E8A1-4B65-9FF8-6EAA6442A3FC',
              },
              {
                state: 'Booted',
                availability: '(available)',
                name: 'iPhone 7',
                udid: '3A409DC5-5188-42A6-8598-3AA6F34607A5',
              },
            ],
          },
        },
        {simulator: 'iPhone 6s (10.0)'},
      ),
    ).toEqual(null);
  });

  it('should return iPad(name with brackets) simulator if simulator name is in the list', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-12-0': [
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 4s',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 5',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPad Pro (9.7-inch)',
                udid: 'B2141C1E-86B7-4A10-82A7-4956799526DF',
              },
            ],
            'com.apple.CoreSimulator.SimRuntime.iOS-12-2': [
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: '2FF48AE5-CC3B-4C80-8D25-48966A6BE2C0',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '841E33FE-E8A1-4B65-9FF8-6EAA6442A3FC',
              },
              {
                state: 'Booted',
                availability: '(available)',
                name: 'iPhone 7',
                udid: '3A409DC5-5188-42A6-8598-3AA6F34607A5',
              },
            ],
          },
        },
        {simulator: 'iPad Pro (9.7-inch)'},
      ),
    ).toEqual({
      udid: 'B2141C1E-86B7-4A10-82A7-4956799526DF',
      name: 'iPad Pro (9.7-inch)',
      booted: false,
      version: 'iOS 12.0',
    });
  });

  it('should return iPad(name with brackets) simulator if simulator name and specified iOS version is in the list', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-12-0': [
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 4s',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 5',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
            ],
            'com.apple.CoreSimulator.SimRuntime.iOS-12-2': [
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: '2FF48AE5-CC3B-4C80-8D25-48966A6BE2C0',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '841E33FE-E8A1-4B65-9FF8-6EAA6442A3FC',
              },
              {
                state: 'Booted',
                availability: '(available)',
                name: 'iPhone 7',
                udid: '3A409DC5-5188-42A6-8598-3AA6F34607A5',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPad Pro (9.7-inch)',
                udid: 'B2141C1E-86B7-4A10-82A7-4956799526DF',
              },
            ],
          },
        },
        {simulator: 'iPad Pro (9.7-inch) (12.2)'},
      ),
    ).toEqual({
      udid: 'B2141C1E-86B7-4A10-82A7-4956799526DF',
      name: 'iPad Pro (9.7-inch)',
      booted: false,
      version: 'iOS 12.2',
    });
  });

  it('should return null if the version is specified and no iPad device with the exact version exists', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-12-0': [
              {
                state: 'Shutdown',
                availability: '(unavailable, runtime profile not found)',
                name: 'iPhone 4s',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 5',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
            ],
            'com.apple.CoreSimulator.SimRuntime.iOS-12-2': [
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6',
                udid: '2FF48AE5-CC3B-4C80-8D25-48966A6BE2C0',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPhone 6 (Plus)',
                udid: '841E33FE-E8A1-4B65-9FF8-6EAA6442A3FC',
              },
              {
                state: 'Booted',
                availability: '(available)',
                name: 'iPhone 7',
                udid: '3A409DC5-5188-42A6-8598-3AA6F34607A5',
              },
              {
                state: 'Shutdown',
                availability: '(available)',
                name: 'iPad Pro (9.7-inch)',
                udid: 'B2141C1E-86B7-4A10-82A7-4956799526DF',
              },
            ],
          },
        },
        {simulator: 'iPad Pro (9.7-inch) (12.0)'},
      ),
    ).toEqual(null);
  });

  it('should return a simulator by UDID', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-12-1': [
              {
                state: 'Shutdown',
                isAvailable: true,
                name: 'iPhone 6s',
                udid: 'D0F29BE7-CC3C-4976-888D-C739B4F50508',
              },
              {
                state: 'Shutdown',
                isAvailable: true,
                name: 'iPhone 6',
                udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
              },
              {
                state: 'Shutdown',
                isAvailable: true,
                name: 'iPhone XS Max',
                udid: 'B9B5E161-416B-43C4-A78F-729CB96CC8C6',
                availabilityError: '',
              },
              {
                state: 'Shutdown',
                isAvailable: true,
                name: 'iPad Air',
                udid: '1CCBBF8B-5773-4EA6-BD6F-C308C87A1ADB',
                availabilityError: '',
              },
              {
                state: 'Shutdown',
                isAvailable: true,
                name: 'iPad (5th generation)',
                udid: '9564ABEE-9EC2-4B4A-B443-D3710929A45A',
                availabilityError: '',
              },
            ],
          },
        },
        {udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C'},
      ),
    ).toEqual({
      udid: 'BA0D93BD-07E6-4182-9B0A-F60A2474139C',
      name: 'iPhone 6',
      booted: false,
      version: 'iOS 12.1',
    });
  });

  it('should return last booted simulator in list if none is defined (multi ios versions)', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-16-0': [
              {
                udid: 'E1C0E452-2671-4EB5-B875-58E3DDC6EE81',
                isAvailable: false,
                state: 'Shutdown',
                name: 'iPhone SE (3rd generation)',
              },
              {
                lastBootedAt: '2022-09-21T11:38:28Z',
                udid: '3AA90A75-D9C3-41A6-8DE1-43BE74A0C32B',
                isAvailable: true,
                state: 'Shutdown',
                name: 'iPhone 14',
              },
              {
                udid: '6F2FA108-AC7D-4D3C-BD13-56C5E7FCEDFE',
                isAvailable: true,
                state: 'Shutdown',
                name: 'iPhone 14 Plus',
              },
              {
                udid: 'D87B6D9E-F5B0-486F-BBE3-6EEC5A6D0C22',
                isAvailable: false,
                state: 'Shutdown',
                name: 'iPhone 14 Pro',
              },
            ],
          },
        },
        null,
      ),
    ).toEqual({
      udid: '3AA90A75-D9C3-41A6-8DE1-43BE74A0C32B',
      name: 'iPhone 14',
      booted: false,
      version: 'iOS 16.0',
    });
  });

  it('should return picked simulator instead of last booted simulator in list (multi ios versions)', () => {
    expect(
      findMatchingSimulator(
        {
          devices: {
            'com.apple.CoreSimulator.SimRuntime.iOS-16-0': [
              {
                udid: 'E1C0E452-2671-4EB5-B875-58E3DDC6EE81',
                isAvailable: false,
                state: 'Shutdown',
                name: 'iPhone SE (3rd generation)',
              },
              {
                lastBootedAt: '2022-09-21T11:38:28Z',
                udid: '3AA90A75-D9C3-41A6-8DE1-43BE74A0C32B',
                isAvailable: true,
                state: 'Shutdown',
                name: 'iPhone 14',
              },
              {
                udid: '6F2FA108-AC7D-4D3C-BD13-56C5E7FCEDFE',
                isAvailable: true,
                state: 'Shutdown',
                name: 'iPhone 14 Plus',
              },
              {
                udid: 'D87B6D9E-F5B0-486F-BBE3-6EEC5A6D0C22',
                isAvailable: false,
                state: 'Shutdown',
                name: 'iPhone 14 Pro',
              },
            ],
          },
        },
        {simulator: 'iPhone 14 Plus'},
      ),
    ).toEqual({
      udid: '6F2FA108-AC7D-4D3C-BD13-56C5E7FCEDFE',
      name: 'iPhone 14 Plus',
      booted: false,
      version: 'iOS 16.0',
    });
  });
});
