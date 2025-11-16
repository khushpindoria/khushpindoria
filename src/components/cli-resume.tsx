
"use client";

import React, { useEffect, useRef, useLayoutEffect } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { useTheme } from "next-themes";

const RESUME = {
  summary: `AI engineer with a cybersecurity background, helping organisations harness trustworthy AI to strengthen security and operational resilience. Previously, as a Transformation Team Lead at Slipstream Cyber, I had a proven record of cutting false-positive alerts by 60% and slashing incident response times by 45%. Passionate about secure-by-design innovation, mentoring, and turning data into business results.`,
  skills: `\x1b[1mTechnical:\x1b[0m
  • Python, Data Analytics, JavaScript/TypeScript, PowerShell, SQL
  • AI/ML, Generative AI (LangChain, AWS Bedrock, SageMaker)
  • Security Engineering, Threat Detection, SIEM/SOAR Optimisation
  • Security Ops Tooling: Microsoft Defender / Sentinel, CrowdStrike, Splunk, Chronicle SOAR
  • Cloud Platforms: Azure, AWS, GCP
  • Dev & Infra: Docker, CI/CD, Terraform, Fortinet, Cisco
\x1b[1mSoft:\x1b[0m
  • Leadership & Mentoring
  • Stakeholder Communication
  • Critical Thinking & Problem-solving`,
  experience: `\x1b[1mAI Engineer | PolusAI | 2024-present\x1b[0m
  • Design and build bespoke AI solutions that transform data into actionable insights and automation.
  • Architect models and platforms that integrate with existing systems and deliver measurable results.
\n\x1b[1mTransformation Team Lead | Slipstream Cyber | 2024\x1b[0m
  • Deployed AI-driven SOAR playbooks → 65% faster investigations
  • Managed 50-staff office relocation with zero downtime
  • Delivered exec dashboards (Power BI) for real-time cyber metrics
\n\x1b[1mCyber Engineering Technical Lead | Slipstream Cyber | 2023-2024\x1b[0m
  • Boosted advanced threat detection by 40% via ML pipelines
  • Achieved ISO 27001 cert with zero non-compliance issues
\n\x1b[1mCyber Engineer | Slipstream Cyber | 2022-2023\x1b[0m
  • Built ML-based detection rules increasing proactive finds by 30%
\n\x1b[1mCyber Defence Analyst | Slipstream Cyber | 2021-2022\x1b[0m
  • Monitored multi-vendor SIEM/EDR, cut false positives 25%`,
  education: `\x1b[1mBSc (Cyber Security)\x1b[0m – Edith Cowan University, 2021 (WAM 80)
\x1b[1mBSc (Computing)\x1b[0m – Curtin University, 2018 (transferred)`,
  certifications: `• Splunk Core Certified Architect / Admin / Power User
• CrowdStrike Certified Falcon Admin
• Microsoft Security Ops Analyst (SC-200)
• Chronicle SOAR Analyst & Developer`,
  certs: `• Splunk Core Certified Architect / Admin / Power User
• CrowdStrike Certified Falcon Admin
• Microsoft Security Ops Analyst (SC-200)
• Chronicle SOAR Analyst & Developer`,
  projects: `• PolusAI Solutions – Designing and building bespoke AI solutions for clients.
• Slipstream AI Transformation – Company-wide automation, Innovation Excellence Award 2025.
• KPFotografy & Web Design – Running a photography business and designing websites (like this one).`,
  contact: `Email   : support@khushpindoria.com
Phone   : +61 4xx xxx xxx
LinkedIn: linkedin.com/in/khush-pindoria-176884189`,
};

const COMMANDS: { [key: string]: (term: Terminal) => string | void } = {
    help: (term) => `Available commands:
  \x1b[32mhelp\x1b[0m       - Show this help message
  \x1b[32msummary\x1b[0m    - Quick professional summary
  \x1b[32mskills\x1b[0m     - List of technical and soft skills
  \x1b[32mexperience\x1b[0m - Work experience
  \x1b[32meducation\x1b[0m  - Educational background
  \x1b[32mcerts\x1b[0m      - List of certifications
  \x1b[32mprojects\x1b[0m   - Recent projects
  \x1b[32mcontact\x1b[0m    - Contact information
  \x1b[32mclear\x1b[0m      - Clear the terminal screen
  \x1b[32mdownload\x1b[0m   - Download a copy of my resume`,
    summary: () => RESUME.summary,
    skills: () => RESUME.skills,
    experience: () => RESUME.experience,
    education: () => RESUME.education,
    certifications: () => RESUME.certifications,
    certs: () => RESUME.certs,
    projects: () => RESUME.projects,
    contact: () => RESUME.contact,
    download: () => {
      window.open("/Khushit_Pindoria_Resume_V3.pdf", "_blank");
      return "Downloading resume...";
    },
    clear: (term) => {
        term.clear();
    },
};

const CliResume = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const term = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);
  const { theme } = useTheme();

  const PROMPT = `\r\n\x1b[1;34m❯\x1b[0m `;

  // Main setup effect
  useLayoutEffect(() => {
    if (!terminalRef.current || term.current) {
      return;
    }

    const xterm = new Terminal({
      convertEol: true,
      cursorBlink: true,
      fontFamily: "monospace",
    });

    const xtermFitAddon = new FitAddon();
    xterm.loadAddon(xtermFitAddon);
    
    term.current = xterm;
    fitAddon.current = xtermFitAddon;
    
    xterm.open(terminalRef.current);
    xtermFitAddon.fit();

    const handleResize = () => xtermFitAddon.fit();
    window.addEventListener("resize", handleResize);

    xterm.writeln("Welcome to Khush's interactive résumé. Type \x1b[3mhelp\x1b[0m to get started.");
    xterm.write(PROMPT);

    let buffer = "";
    let history: string[] = [];
    let historyIndex = -1;

    const onDataDisposable = xterm.onData((key) => {
        const termInstance = term.current;
        if (!termInstance) return;

        const charCode = key.charCodeAt(0);

        if (charCode === 13) { // Enter
            termInstance.write("\r\n");
            const command = buffer.trim().toLowerCase();
            if (command) {
                history = [command, ...history.filter((h) => h !== command)];
                historyIndex = -1;

                const action = COMMANDS[command];
                if (action) {
                    const output = action(termInstance);
                    if (output) termInstance.writeln(output.replace(/\n/g, "\r\n"));
                } else {
                    termInstance.writeln(`Command not found: ${command}`);
                }
            }
            buffer = "";
            termInstance.write(PROMPT);
            return;
        }

        if (charCode === 127) { // Backspace
            if (buffer.length > 0) {
                buffer = buffer.slice(0, -1);
                termInstance.write("\b \b");
            }
            return;
        }

        if (charCode === 9) { // Tab
            const matchingCommands = Object.keys(COMMANDS).filter((c) =>
                c.startsWith(buffer.toLowerCase())
            );
            if (matchingCommands.length === 1) {
                const match = matchingCommands[0];
                const remainder = match.slice(buffer.length);
                buffer += remainder;
                termInstance.write(remainder);
            } else if (matchingCommands.length > 1) {
                termInstance.write("\r\n" + matchingCommands.join("  ") + PROMPT + buffer);
            }
            return;
        }

        if (key.startsWith("\x1b[")) { // Arrow keys
            switch (key) {
                case "\x1b[A": // Up
                    if (history.length > 0 && historyIndex < history.length - 1) {
                        historyIndex++;
                        buffer = history[historyIndex];
                        termInstance.write(`\r${PROMPT}\x1b[K${buffer}`);
                    }
                    break;
                case "\x1b[B": // Down
                    if (historyIndex > 0) {
                        historyIndex--;
                        buffer = history[historyIndex];
                        termInstance.write(`\r${PROMPT}\x1b[K${buffer}`);
                    } else {
                        historyIndex = -1;
                        buffer = "";
                        termInstance.write(`\r${PROMPT}\x1b[K`);
                    }
                    break;
            }
            return;
        }

        if (charCode >= 32) {
            buffer += key;
            termInstance.write(key);
        }
    });

    return () => {
        window.removeEventListener("resize", handleResize);
        onDataDisposable.dispose();
        term.current?.dispose();
        term.current = null;
    };
  }, []); // Run only once

  // Theme update effect
  useEffect(() => {
    if (term.current) {
      const foreground = theme === "dark" ? "#F5F5F5" : "#1A1A1A";
      const cursor = theme === "dark" ? "#64B5F6" : "#1565C0";
      term.current.options.theme = {
        background: "transparent",
        foreground,
        cursor,
      };
    }
  }, [theme]);

  return (
    <div
      ref={terminalRef}
      className="w-full max-w-4xl h-[480px] bg-card/50 rounded-lg shadow-lg border border-secondary p-4 backdrop-blur-sm text-left"
    />
  );
};

export default CliResume;
