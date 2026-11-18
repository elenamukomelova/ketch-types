import { ConfigurationV2, ExperienceContentConfig, ExperienceLayoutConfig, ThemeConfig } from './index'

describe('opt-out form types', () => {
  const color = { color: '#071a24' }
  const text = { color: '#071a24' }

  const theme: ThemeConfig = {
    modal: {
      optOutNotice: {
        fill: color,
        outline: color,
        title: text,
        description: text,
        cornerRadius: 8,
      },
    },
    preference: {
      tabs: {
        purposes: {
          optOutNotice: {
            fill: color,
            outline: color,
            title: text,
            description: text,
            cornerRadius: 8,
          },
        },
        requests: {
          rightForm: {
            gpcBanner: { fill: color, outline: color, cornerRadius: 4 },
            consentSummary: {
              background: color,
              outline: color,
              cornerRadius: 4,
              title: text,
              description: text,
              item: { background: color, text, cornerRadius: 4 },
              optedIn: { background: color, outline: color, text },
              optedOut: { background: color, outline: color, text },
              optedOutByGpc: { background: color, outline: color, text },
            },
          },
          submitted: {
            optOutProgress: {
              complete: {
                fill: color,
                outline: color,
                cornerRadius: 4,
                title: text,
                description: text,
                icon: { useDefaultIcon: false, icon: color, iconUrl: 'https://example.com/check.svg' },
              },
              pending: {
                fill: color,
                icon: { useDefaultIcon: true },
              },
              track: {
                background: color,
                cornerRadius: 4,
                title: text,
                description: text,
                arrowIcon: color,
              },
            },
          },
        },
      },
    },
  }

  const layout: ExperienceLayoutConfig = {
    modal: {
      optOutNotice: {
        visible: true,
        title: { useDefaultText: false },
        description: { useDefaultText: true },
        actionButton: { useDefaultText: false },
      },
    },
    preference: {
      tabs: {
        purposes: {
          optOutNotice: {
            visible: true,
            title: { useDefaultText: false },
            description: {},
            actionButton: { useDefaultText: true },
          },
        },
        requests: {
          rightForm: {
            gpcBanner: { visible: true },
            attBanner: { visible: false },
            consentSummary: {
              visible: true,
              title: { useDefaultText: false },
              description: { useDefaultText: false },
              readOnly: { useDefaultText: true },
              allowed: { useDefaultText: true },
              optedOut: { useDefaultText: true },
              optedOutByGpc: { useDefaultText: false },
            },
          },
          submitted: {
            actionButton: { visible: true, useDefaultText: true },
            optOutProgress: {
              receivedTitle: { useDefaultText: false },
              receivedDescription: { useDefaultText: false },
              deviceTitle: { useDefaultText: true },
              deviceDescription: { useDefaultText: true },
              systemsTitle: { useDefaultText: true },
              systemsDescription: { useDefaultText: true },
              trackTitle: { useDefaultText: false },
              trackDescription: { useDefaultText: false },
            },
          },
        },
      },
    },
  }

  const content: ExperienceContentConfig = {
    modal: {
      optOutNotice: {
        title: 'You turned off targeted advertising',
        description: 'Submit an opt-out request to apply it everywhere.',
        actionButtonText: 'Opt out',
      },
    },
    preference: {
      tabs: {
        purposes: {
          optOutNotice: {
            title: 'You turned off targeted advertising',
            description: 'Submit an opt-out request to apply it everywhere.',
            actionButtonText: 'Opt out',
          },
        },
        requests: {
          rightForm: {
            gpcBanner: { title: 'GPC detected', description: 'Your browser sent a GPC signal.' },
            attBanner: { title: 'Tracking off', description: 'App tracking is off.', openSettingsLink: 'Settings' },
            consentSummary: {
              title: 'Your choices',
              description: 'Your current choices for each purpose.',
              readOnly: 'Read only',
              allowed: 'Allowed',
              optedOut: 'Opted out',
              optedOutByGpc: 'Opted out by GPC',
            },
          },
          submitted: {
            optOutProgress: {
              receivedTitle: 'Request received',
              receivedDescription: 'We received your request.',
              deviceTitle: 'This device',
              deviceDescription: 'Opted out on this device.',
              systemsTitle: 'Other systems',
              systemsDescription: 'We are processing your request.',
              trackTitle: 'Track your request',
              trackDescription: 'Check status in the privacy portal.',
            },
          },
        },
      },
    },
  }

  const config: ConfigurationV2 = {
    organization: { code: 'org' },
    rights: [
      {
        code: 'opt_out',
        name: 'Opt out',
        description: 'Opt out of targeted advertising',
        canonicalRightCode: 'restrict',
        optOutPurposeCodes: ['targeted_advertising'],
      },
    ],
    theme,
    experiences: { layout, content },
    formTemplates: [],
  }

  it('carries the purposes an opt-out right covers', () => {
    expect(config.rights?.[0].optOutPurposeCodes?.[0]).toBe('targeted_advertising')
  })

  it('carries the opt-out progress track arrow icon theme', () => {
    expect(config.theme?.preference?.tabs?.requests?.submitted?.optOutProgress?.track?.arrowIcon).toBeDefined()
  })

  it('carries the opt-out notice, consent summary, and progress layout and content', () => {
    expect(config.theme?.modal?.optOutNotice).toBeDefined()
    expect(config.theme?.preference?.tabs?.purposes?.optOutNotice).toBeDefined()
    expect(config.theme?.preference?.tabs?.requests?.rightForm?.consentSummary?.optedOutByGpc).toBeDefined()
    expect(config.theme?.preference?.tabs?.requests?.rightForm?.gpcBanner).toBeDefined()
    expect(layout.preference?.tabs?.requests?.rightForm?.consentSummary?.visible).toBe(true)
    expect(layout.preference?.tabs?.requests?.submitted?.optOutProgress?.trackTitle?.useDefaultText).toBe(false)
    expect(content.preference?.tabs?.requests?.rightForm?.consentSummary?.optedOutByGpc).toBe('Opted out by GPC')
    expect(content.modal?.optOutNotice?.actionButtonText).toBe('Opt out')
  })
})
