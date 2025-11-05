import React, { useState } from 'react';
import { Building2, TrendingUp, Shield, Users, DollarSign, Brain, Target, AlertCircle, Download, ChevronDown, ChevronUp, Star } from 'lucide-react';

const MauboussinAnalyzer = () => {
  const [company, setCompany] = useState('');
  const [currentSection, setCurrentSection] = useState('overview');
  const [expandedSection, setExpandedSection] = useState(null);
  
  const [analysis, setAnalysis] = useState({
    // Company Overview
    companyName: '',
    businessModel: '',
    industry: '',
    
    // Moat Assessment
    supplyScale: { score: 0, notes: '' },
    networkEffects: { score: 0, notes: '' },
    switchingCosts: { score: 0, notes: '' },
    intangibles: { score: 0, notes: '' },
    costAdvantages: { score: 0, notes: '' },
    
    // Expectations
    currentValuation: '',
    impliedExpectations: '',
    upwardTriggers: '',
    downwardTriggers: '',
    
    // Probabilistic Assessment
    baseRate: '',
    outcomeRange: '',
    skillVsLuck: '',
    
    // Management
    capitalAllocation: '',
    strategicThinking: '',
    trackRecord: '',
    
    // Conclusion
    moatRating: 'None',
    trajectory: 'Stable',
    investmentThesis: '',
    keyRisks: '',
    whatWouldChange: ''
  });

  const sections = [
    { id: 'overview', name: 'Company Overview', icon: Building2 },
    { id: 'moat', name: 'Competitive Moat', icon: Shield },
    { id: 'expectations', name: 'Expectations Analysis', icon: TrendingUp },
    { id: 'probabilistic', name: 'Probabilistic View', icon: Brain },
    { id: 'management', name: 'Management Quality', icon: Users },
    { id: 'conclusion', name: 'Conclusion', icon: Target }
  ];

  const moatDimensions = [
    {
      key: 'supplyScale',
      name: 'Supply-Side Scale',
      description: 'Cost advantages that increase with scale',
      questions: [
        'Does the company have fixed costs that spread across larger output?',
        'How does unit cost decline with volume?',
        'What is the minimum efficient scale in this industry?'
      ]
    },
    {
      key: 'networkEffects',
      name: 'Network Effects',
      description: 'Product becomes more valuable as more people use it',
      questions: [
        'Are there direct user-to-user network effects?',
        'Are there platform dynamics or indirect effects?',
        'How strong and sustainable are these effects?'
      ]
    },
    {
      key: 'switchingCosts',
      name: 'Switching Costs',
      description: 'What customers lose by switching',
      questions: [
        'Are there financial, procedural, or relational switching costs?',
        'How sticky is the customer relationship?',
        'What is customer lifetime value?'
      ]
    },
    {
      key: 'intangibles',
      name: 'Intangible Assets',
      description: 'Brands, patents, culture, regulatory advantages',
      questions: [
        'Does the brand command pricing power?',
        'Are there proprietary technologies or IP?',
        'Is there a unique organizational capability?'
      ]
    },
    {
      key: 'costAdvantages',
      name: 'Cost Advantages',
      description: 'Structural cost advantages beyond scale',
      questions: [
        'Are there unique cost structure advantages?',
        'Does the business model enable lower costs?',
        'Are these advantages sustainable?'
      ]
    }
  ];

  const StarRating = ({ score, onChange, dimension }) => {
    return (
      <div className="flex items-center gap-2 my-2">
        <span className="text-sm font-medium text-gray-700 w-24">Strength:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onChange(dimension, star)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                size={24}
                className={star <= score ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-600 ml-2">
          {score === 0 && 'Not rated'}
          {score === 1 && 'Very Weak'}
          {score === 2 && 'Weak'}
          {score === 3 && 'Moderate'}
          {score === 4 && 'Strong'}
          {score === 5 && 'Very Strong'}
        </span>
      </div>
    );
  };

  const updateMoatScore = (dimension, score) => {
    setAnalysis(prev => ({
      ...prev,
      [dimension]: { ...prev[dimension], score }
    }));
  };

  const updateMoatNotes = (dimension, notes) => {
    setAnalysis(prev => ({
      ...prev,
      [dimension]: { ...prev[dimension], notes }
    }));
  };

  const calculateOverallMoat = () => {
    const scores = [
      analysis.supplyScale.score,
      analysis.networkEffects.score,
      analysis.switchingCosts.score,
      analysis.intangibles.score,
      analysis.costAdvantages.score
    ];
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return avg;
  };

  const getMoatRating = (score) => {
    if (score >= 4) return { text: 'Wide Moat', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 2.5) return { text: 'Narrow Moat', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'No Moat', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const exportAnalysis = () => {
    const moatScore = calculateOverallMoat();
    const moatRating = getMoatRating(moatScore);
    
    const report = `
MAUBOUSSIN COMPETITIVE ANALYSIS
Generated: ${new Date().toLocaleDateString()}

═══════════════════════════════════════════════════════════

COMPANY OVERVIEW
───────────────────────────────────────────────────────────
Company: ${analysis.companyName || 'Not specified'}
Business Model: ${analysis.businessModel || 'Not specified'}
Industry: ${analysis.industry || 'Not specified'}

═══════════════════════════════════════════════════════════

COMPETITIVE MOAT ASSESSMENT
───────────────────────────────────────────────────────────

Overall Moat Rating: ${moatRating.text} (${moatScore.toFixed(1)}/5.0)
Trajectory: ${analysis.trajectory}

Detailed Scores:
1. Supply-Side Scale: ${analysis.supplyScale.score}/5
${analysis.supplyScale.notes ? `   Notes: ${analysis.supplyScale.notes}` : ''}

2. Network Effects: ${analysis.networkEffects.score}/5
${analysis.networkEffects.notes ? `   Notes: ${analysis.networkEffects.notes}` : ''}

3. Switching Costs: ${analysis.switchingCosts.score}/5
${analysis.switchingCosts.notes ? `   Notes: ${analysis.switchingCosts.notes}` : ''}

4. Intangible Assets: ${analysis.intangibles.score}/5
${analysis.intangibles.notes ? `   Notes: ${analysis.intangibles.notes}` : ''}

5. Cost Advantages: ${analysis.costAdvantages.score}/5
${analysis.costAdvantages.notes ? `   Notes: ${analysis.costAdvantages.notes}` : ''}

═══════════════════════════════════════════════════════════

EXPECTATIONS ANALYSIS
───────────────────────────────────────────────────────────

Current Valuation:
${analysis.currentValuation || 'Not specified'}

Implied Expectations:
${analysis.impliedExpectations || 'Not specified'}

Upward Revision Triggers:
${analysis.upwardTriggers || 'Not specified'}

Downward Revision Triggers:
${analysis.downwardTriggers || 'Not specified'}

═══════════════════════════════════════════════════════════

PROBABILISTIC ASSESSMENT
───────────────────────────────────────────────────────────

Base Rate Analysis:
${analysis.baseRate || 'Not specified'}

Range of Outcomes:
${analysis.outcomeRange || 'Not specified'}

Skill vs. Luck Assessment:
${analysis.skillVsLuck || 'Not specified'}

═══════════════════════════════════════════════════════════

MANAGEMENT & CAPITAL ALLOCATION
───────────────────────────────────────────────────────────

Capital Allocation Track Record:
${analysis.capitalAllocation || 'Not specified'}

Strategic Thinking:
${analysis.strategicThinking || 'Not specified'}

Overall Track Record:
${analysis.trackRecord || 'Not specified'}

═══════════════════════════════════════════════════════════

CONCLUSION
───────────────────────────────────────────────────────────

Investment Thesis:
${analysis.investmentThesis || 'Not specified'}

Key Risks:
${analysis.keyRisks || 'Not specified'}

What Would Change the Thesis:
${analysis.whatWouldChange || 'Not specified'}

═══════════════════════════════════════════════════════════

MAUBOUSSIN PRINCIPLES CHECKLIST
───────────────────────────────────────────────────────────
☐ Competitive advantage assessed across multiple dimensions
☐ Current expectations reverse-engineered from valuation
☐ Probabilistic thinking applied (distributions, not point estimates)
☐ Base rates considered for outside view
☐ Skill vs. luck analysis conducted
☐ Management capital allocation evaluated
☐ Key risks and disconfirming evidence identified
☐ Clear thesis and what would change your mind

═══════════════════════════════════════════════════════════

"The big money is not in the buying or selling, but in the waiting."
- Charlie Munger

This analysis follows Michael Mauboussin's framework for competitive 
advantage assessment and expectations investing.
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${analysis.companyName || 'company'}_mauboussin_analysis.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <AlertCircle size={20} />
          About This Framework
        </h3>
        <p className="text-sm text-blue-800">
          This tool helps you analyze companies using Michael Mauboussin's investment frameworks, 
          focusing on competitive advantages (moats), expectations investing, and probabilistic thinking.
          Work through each section systematically for a comprehensive analysis.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          value={analysis.companyName}
          onChange={(e) => setAnalysis(prev => ({ ...prev, companyName: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Apple Inc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Model
        </label>
        <textarea
          value={analysis.businessModel}
          onChange={(e) => setAnalysis(prev => ({ ...prev, businessModel: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          placeholder="Describe how the company makes money, its value proposition, and key business model characteristics..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Industry
        </label>
        <input
          type="text"
          value={analysis.industry}
          onChange={(e) => setAnalysis(prev => ({ ...prev, industry: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Technology Hardware, Retail, Financial Services"
        />
      </div>
    </div>
  );

  const renderMoat = () => {
    const moatScore = calculateOverallMoat();
    const moatRating = getMoatRating(moatScore);

    return (
      <div className="space-y-6">
        <div className={`${moatRating.bg} border-2 ${moatRating.color} border-current rounded-lg p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-1">Overall Moat Assessment</h3>
              <p className={`text-3xl font-bold ${moatRating.color}`}>{moatRating.text}</p>
              <p className="text-lg mt-1">Score: {moatScore.toFixed(1)} / 5.0</p>
            </div>
            <Shield size={64} className={moatRating.color} />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Moat Trajectory</label>
            <select
              value={analysis.trajectory}
              onChange={(e) => setAnalysis(prev => ({ ...prev, trajectory: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Strengthening">Strengthening 📈</option>
              <option value="Stable">Stable ➡️</option>
              <option value="Weakening">Weakening 📉</option>
            </select>
          </div>
        </div>

        {moatDimensions.map((dimension) => (
          <div key={dimension.key} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === dimension.key ? null : dimension.key)}
              className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
            >
              <div className="text-left">
                <h4 className="font-semibold text-lg">{dimension.name}</h4>
                <p className="text-sm text-gray-600">{dimension.description}</p>
              </div>
              {expandedSection === dimension.key ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            {expandedSection === dimension.key && (
              <div className="px-6 py-4 space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-sm font-medium text-blue-900 mb-2">Key Questions:</p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {dimension.questions.map((q, i) => (
                      <li key={i}>• {q}</li>
                    ))}
                  </ul>
                </div>

                <StarRating
                  score={analysis[dimension.key].score}
                  onChange={updateMoatScore}
                  dimension={dimension.key}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Analysis & Evidence
                  </label>
                  <textarea
                    value={analysis[dimension.key].notes}
                    onChange={(e) => updateMoatNotes(dimension.key, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Document your analysis, evidence, and reasoning for this dimension..."
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderExpectations = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h3 className="font-semibold text-purple-900 mb-2">About Expectations Investing</h3>
        <p className="text-sm text-purple-800">
          Reverse-engineer what expectations are embedded in the current stock price, then assess 
          likelihood of expectations being revised up or down. Focus on what has to go right vs. what's priced in.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Valuation Metrics
        </label>
        <textarea
          value={analysis.currentValuation}
          onChange={(e) => setAnalysis(prev => ({ ...prev, currentValuation: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Stock price, P/E ratio, EV/EBITDA, market cap, etc..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Implied Expectations (What's Priced In?)
        </label>
        <textarea
          value={analysis.impliedExpectations}
          onChange={(e) => setAnalysis(prev => ({ ...prev, impliedExpectations: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Reverse-engineer: What revenue growth, margins, market share, or competitive position does the current price assume?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Positive Revision Triggers 📈
        </label>
        <textarea
          value={analysis.upwardTriggers}
          onChange={(e) => setAnalysis(prev => ({ ...prev, upwardTriggers: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="What events or outcomes would cause expectations to be revised upward? What's the probability?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Negative Revision Triggers 📉
        </label>
        <textarea
          value={analysis.downwardTriggers}
          onChange={(e) => setAnalysis(prev => ({ ...prev, downwardTriggers: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="What events or outcomes would cause expectations to be revised downward? What's the probability?"
        />
      </div>
    </div>
  );

  const renderProbabilistic = () => (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <h3 className="font-semibold text-indigo-900 mb-2">Probabilistic Thinking</h3>
        <p className="text-sm text-indigo-800">
          Think in distributions, not point estimates. Use base rates for the outside view. 
          Consider the full range of outcomes and their probabilities. Separate skill from luck.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Base Rate Analysis
        </label>
        <textarea
          value={analysis.baseRate}
          onChange={(e) => setAnalysis(prev => ({ ...prev, baseRate: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="What do historical statistics tell us? Success rates for similar companies/situations? Industry-wide data? How does this case differ from the base rate?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Range of Outcomes & Probabilities
        </label>
        <textarea
          value={analysis.outcomeRange}
          onChange={(e) => setAnalysis(prev => ({ ...prev, outcomeRange: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="What's the distribution of possible outcomes? Bull case, base case, bear case with probabilities? What are the tail risks (fat-tail events)?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skill vs. Luck Assessment
        </label>
        <textarea
          value={analysis.skillVsLuck}
          onChange={(e) => setAnalysis(prev => ({ ...prev, skillVsLuck: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="How much of success is due to skill vs. favorable circumstances? Is there a repeatable process? Has success been consistent across time/situations?"
        />
      </div>
    </div>
  );

  const renderManagement = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">Management Quality</h3>
        <p className="text-sm text-green-800">
          Assess capital allocation discipline, strategic thinking, and long-term orientation. 
          Great managers compound value over time through intelligent capital deployment.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Capital Allocation Track Record
        </label>
        <textarea
          value={analysis.capitalAllocation}
          onChange={(e) => setAnalysis(prev => ({ ...prev, capitalAllocation: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="How does management allocate capital? M&A track record? Buybacks vs. dividends vs. reinvestment? ROIC history? Returns above cost of capital?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Strategic Thinking & Philosophy
        </label>
        <textarea
          value={analysis.strategicThinking}
          onChange={(e) => setAnalysis(prev => ({ ...prev, strategicThinking: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Does management understand their competitive advantages? Long-term vs. short-term focus? Intellectual honesty? Adaptability? Owner-operator mindset?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Overall Management Assessment
        </label>
        <textarea
          value={analysis.trackRecord}
          onChange={(e) => setAnalysis(prev => ({ ...prev, trackRecord: e.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Summary assessment of management quality, culture, and execution capability..."
        />
      </div>
    </div>
  );

  const renderConclusion = () => {
    const moatScore = calculateOverallMoat();
    const moatRating = getMoatRating(moatScore);

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Summary Assessment</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Competitive Moat</p>
              <p className={`text-lg font-bold ${moatRating.color}`}>{moatRating.text}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Trajectory</p>
              <p className="text-lg font-bold">{analysis.trajectory}</p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Thesis (2-3 sentences)
          </label>
          <textarea
            value={analysis.investmentThesis}
            onChange={(e) => setAnalysis(prev => ({ ...prev, investmentThesis: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Concise summary of why this company is/isn't attractive. What makes it unique? What's the core value proposition?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Risks & Uncertainties
          </label>
          <textarea
            value={analysis.keyRisks}
            onChange={(e) => setAnalysis(prev => ({ ...prev, keyRisks: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="What could go wrong? What are the key uncertainties? What disconfirming evidence exists?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What Would Change Your Mind?
          </label>
          <textarea
            value={analysis.whatWouldChange}
            onChange={(e) => setAnalysis(prev => ({ ...prev, whatWouldChange: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="What metrics or events would cause you to revise your thesis? What are the key indicators to monitor?"
          />
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-900 mb-2">Mauboussin Principles Checklist</h4>
          <div className="space-y-1 text-sm text-yellow-800">
            <div>✓ Competitive advantage across multiple dimensions</div>
            <div>✓ Expectations reverse-engineered from valuation</div>
            <div>✓ Probabilistic thinking (distributions, not points)</div>
            <div>✓ Base rates considered for outside view</div>
            <div>✓ Skill vs. luck analysis</div>
            <div>✓ Management capital allocation evaluated</div>
            <div>✓ Key risks and disconfirming evidence identified</div>
            <div>✓ Clear thesis and revision criteria</div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'overview': return renderOverview();
      case 'moat': return renderMoat();
      case 'expectations': return renderExpectations();
      case 'probabilistic': return renderProbabilistic();
      case 'management': return renderManagement();
      case 'conclusion': return renderConclusion();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Mauboussin Competitive Analysis</h1>
          <p className="text-blue-100">
            Systematic framework for analyzing competitive advantages, expectations, and value creation
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    currentSection === section.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  {section.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          {renderContent()}
        </div>

        {/* Export Button */}
        <div className="flex justify-center">
          <button
            onClick={exportAnalysis}
            className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            <Download size={20} />
            Export Complete Analysis
          </button>
        </div>

        {/* Footer Quote */}
        <div className="mt-8 text-center">
          <blockquote className="text-gray-600 italic">
            "The big money is not in the buying or selling, but in the waiting."
            <br />
            <span className="text-gray-500 text-sm">— Charlie Munger</span>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default MauboussinAnalyzer;
