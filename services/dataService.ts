// Dummy data for different partners
const partnerData = {
  edutech: {
    name: 'EduTech Foundation',
    budget: 850000,
    schools: 450,
    students: 120000,
    teachers: 2500,
    kits: 5000
  }
};

// Dummy data for Indian states
const stateData = {
  "andhra-pradesh": {
    name: 'Andhra Pradesh',
    budget: 1200000,
    schools: 650,
    students: 180000,
    teachers: 3500,
    kits: 6500
  },
  "delhi": {
    name: 'Delhi',
    budget: 950000,
    schools: 480,
    students: 125000,
    teachers: 2500,
    kits: 4800
  },
  "maharashtra": {
    name: 'Maharashtra',
    budget: 1600000,
    schools: 850,
    students: 230000,
    teachers: 4600,
    kits: 8500
  },
  "karnataka": {
    name: 'Karnataka',
    budget: 1300000,
    schools: 680,
    students: 180000,
    teachers: 3600,
    kits: 6800
  },
  "tamil-nadu": {
    name: 'Tamil Nadu',
    budget: 1400000,
    schools: 720,
    students: 190000,
    teachers: 3800,
    kits: 7200
  },
  "kerala": {
    name: 'Kerala',
    budget: 950000,
    schools: 480,
    students: 125000,
    teachers: 2500,
    kits: 4800
  },
  "gujarat": {
    name: 'Gujarat',
    budget: 1100000,
    schools: 580,
    students: 150000,
    teachers: 2900,
    kits: 5800
  },
  "rajasthan": {
    name: 'Rajasthan',
    budget: 1300000,
    schools: 680,
    students: 180000,
    teachers: 3600,
    kits: 6800
  },
  "uttar-pradesh": {
    name: 'Uttar Pradesh',
    budget: 2000000,
    schools: 1000,
    students: 280000,
    teachers: 5600,
    kits: 10000
  },
  "west-bengal": {
    name: 'West Bengal',
    budget: 1300000,
    schools: 680,
    students: 180000,
    teachers: 3600,
    kits: 6800
  },
  arunachalpradesh: {
    name: 'Arunachal Pradesh',
    budget: 450000,
    schools: 180,
    students: 45000,
    teachers: 900,
    kits: 1800
  },
  assam: {
    name: 'Assam',
    budget: 850000,
    schools: 420,
    students: 110000,
    teachers: 2200,
    kits: 4200
  },
  bihar: {
    name: 'Bihar',
    budget: 1500000,
    schools: 800,
    students: 220000,
    teachers: 4200,
    kits: 8000
  },
  chhattisgarh: {
    name: 'Chhattisgarh',
    budget: 750000,
    schools: 380,
    students: 95000,
    teachers: 1900,
    kits: 3800
  },
  goa: {
    name: 'Goa',
    budget: 350000,
    schools: 150,
    students: 35000,
    teachers: 700,
    kits: 1500
  },
  himachalpradesh: {
    name: 'Himachal Pradesh',
    budget: 550000,
    schools: 280,
    students: 65000,
    teachers: 1300,
    kits: 2800
  },
  jharkhand: {
    name: 'Jharkhand',
    budget: 750000,
    schools: 380,
    students: 95000,
    teachers: 1900,
    kits: 3800
  },
  madhyapradesh: {
    name: 'Madhya Pradesh',
    budget: 1400000,
    schools: 720,
    students: 190000,
    teachers: 3800,
    kits: 7200
  },
  manipur: {
    name: 'Manipur',
    budget: 400000,
    schools: 160,
    students: 40000,
    teachers: 800,
    kits: 1600
  },
  meghalaya: {
    name: 'Meghalaya',
    budget: 350000,
    schools: 150,
    students: 35000,
    teachers: 700,
    kits: 1500
  },
  mizoram: {
    name: 'Mizoram',
    budget: 300000,
    schools: 120,
    students: 30000,
    teachers: 600,
    kits: 1200
  },
  nagaland: {
    name: 'Nagaland',
    budget: 300000,
    schools: 120,
    students: 30000,
    teachers: 600,
    kits: 1200
  },
  odisha: {
    name: 'Odisha',
    budget: 950000,
    schools: 480,
    students: 125000,
    teachers: 2500,
    kits: 4800
  },
  punjab: {
    name: 'Punjab',
    budget: 750000,
    schools: 380,
    students: 95000,
    teachers: 1900,
    kits: 3800
  },
  sikkim: {
    name: 'Sikkim',
    budget: 250000,
    schools: 100,
    students: 25000,
    teachers: 500,
    kits: 1000
  },
  telangana: {
    name: 'Telangana',
    budget: 950000,
    schools: 480,
    students: 125000,
    teachers: 2500,
    kits: 4800
  },
  tripura: {
    name: 'Tripura',
    budget: 350000,
    schools: 150,
    students: 35000,
    teachers: 700,
    kits: 1500
  },
  uttarakhand: {
    name: 'Uttarakhand',
    budget: 550000,
    schools: 280,
    students: 65000,
    teachers: 1300,
    kits: 2800
  },
  westbengal: {
    name: 'West Bengal',
    budget: 1300000,
    schools: 680,
    students: 180000,
    teachers: 3600,
    kits: 6800
  }
};

// Dummy data for different periods
const periodData = {
  Q1: {
    budget: 600000,
    schools: 300,
    students: 75000,
    teachers: 1600,
    kits: 3200
  },
  Q2: {
    budget: 750000,
    schools: 380,
    students: 95000,
    teachers: 2000,
    kits: 4000
  },
  Q3: {
    budget: 900000,
    schools: 450,
    students: 115000,
    teachers: 2400,
    kits: 4800
  },
  Q4: {
    budget: 850000,
    schools: 420,
    students: 105000,
    teachers: 2200,
    kits: 4400
  },
  YTD: {
    budget: 3100000,
    schools: 1550,
    students: 390000,
    teachers: 8200,
    kits: 16400
  }
};

// Function to get filtered data based on period
export function getFilteredData(period: string) {
  // Get data for the selected period
  const periodData = {
    Q1: {
      budget: 600000,
      schools: 300,
      students: 75000,
      teachers: 1600,
      kits: 3200
    },
    Q2: {
      budget: 750000,
      schools: 380,
      students: 95000,
      teachers: 2000,
      kits: 4000
    },
    Q3: {
      budget: 900000,
      schools: 450,
      students: 115000,
      teachers: 2400,
      kits: 4800
    },
    Q4: {
      budget: 850000,
      schools: 420,
      students: 105000,
      teachers: 2200,
      kits: 4400
    },
    YTD: {
      budget: 3100000,
      schools: 1550,
      students: 390000,
      teachers: 8200,
      kits: 16400
    }
  };

  return periodData[period as keyof typeof periodData] || periodData.YTD;
}

// Function to get budget data based on period
export function getBudgetData(period: string) {
  const filteredData = getFilteredData(period);
  return Math.round(filteredData.budget * 0.75); // 75% of budget utilized
}

// Function to get performance data for charts
export function getPerformanceData(partner: string, period: string) {
  type Phase = 'Planning' | 'Implementation' | 'Review';
  
  const baseData: Array<{ month: string; students: number; teachers: number; schools: number; phase: Phase }> = [
    { month: 'Jan', students: 0, teachers: 0, schools: 0, phase: 'Planning' },
    { month: 'Feb', students: 0, teachers: 0, schools: 0, phase: 'Planning' },
    { month: 'Mar', students: 0, teachers: 0, schools: 0, phase: 'Implementation' },
    { month: 'Apr', students: 0, teachers: 0, schools: 0, phase: 'Implementation' },
    { month: 'May', students: 0, teachers: 0, schools: 0, phase: 'Implementation' },
    { month: 'Jun', students: 0, teachers: 0, schools: 0, phase: 'Implementation' },
    { month: 'Jul', students: 0, teachers: 0, schools: 0, phase: 'Implementation' },
    { month: 'Aug', students: 0, teachers: 0, schools: 0, phase: 'Implementation' },
    { month: 'Sep', students: 0, teachers: 0, schools: 0, phase: 'Implementation' },
    { month: 'Oct', students: 0, teachers: 0, schools: 0, phase: 'Implementation' },
    { month: 'Nov', students: 0, teachers: 0, schools: 0, phase: 'Review' },
    { month: 'Dec', students: 0, teachers: 0, schools: 0, phase: 'Review' }
  ];

  const filteredData = getFilteredData(period);
  
  // Define phase-based multipliers
  const phaseMultipliers: Record<Phase, number> = {
    Planning: 0.2,
    Implementation: 0.8,
    Review: 1.0
  };

  // Define monthly progress patterns
  const progressPatterns: Record<Phase, number[]> = {
    Planning: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.0, 1.0],
    Implementation: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.0],
    Review: [0.0, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
  };

  return baseData.map((item, index) => {
    const phase = item.phase;
    const phaseMultiplier = phaseMultipliers[phase];
    const progress = progressPatterns[phase][index];
    
    // Add slight variations to make it more realistic
    const variation = 0.95 + Math.random() * 0.1;
    
    return {
      ...item,
      students: Math.floor(filteredData.students * progress * phaseMultiplier * variation),
      teachers: Math.floor(filteredData.teachers * progress * phaseMultiplier * variation),
      schools: Math.floor(filteredData.schools * progress * phaseMultiplier * variation)
    };
  });
}

// Function to get district-wise data
export function getDistrictData(partner: string, period: string) {
  const filteredData = getFilteredData(period);
  const numDistricts = 6;
  
  return Array.from({ length: numDistricts }, (_, i) => {
    const coverage = 60 + Math.floor(Math.random() * 30); // Random coverage between 60-90%
    const totalSchools = Math.floor(filteredData.schools / numDistricts);
    const totalStudents = Math.floor(filteredData.students / numDistricts);
    
    return {
      name: `District ${i + 1}`,
      coverage,
      totalSchools,
      coveredSchools: Math.floor(totalSchools * (coverage / 100)),
      totalStudents,
      coveredStudents: Math.floor(totalStudents * (coverage / 100)),
      teachersTrained: Math.floor(filteredData.teachers / numDistricts),
      kitsDeployed: Math.floor(filteredData.kits / numDistricts)
    };
  });
}

// Function to get block-wise data
export function getBlockData(partner: string, period: string) {
  const filteredData = getFilteredData(period);
  const numBlocks = 6;
  
  return Array.from({ length: numBlocks }, (_, i) => {
    const coverage = 50 + Math.floor(Math.random() * 40); // Random coverage between 50-90%
    const totalSchools = Math.floor(filteredData.schools / numBlocks);
    const totalStudents = Math.floor(filteredData.students / numBlocks);
    
    return {
      name: `Block ${i + 1}`,
      coverage,
      totalSchools,
      coveredSchools: Math.floor(totalSchools * (coverage / 100)),
      totalStudents,
      coveredStudents: Math.floor(totalStudents * (coverage / 100)),
      teachersTrained: Math.floor(filteredData.teachers / numBlocks),
      kitsDeployed: Math.floor(filteredData.kits / numBlocks)
    };
  });
}

export function getPartnerDistribution(partner: string, period: string) {
  const filteredData = getFilteredData(period);
  
  // If specific partner is selected, show their data only
  if (partner !== 'all') {
    const partnerInfo = partnerData[partner as keyof typeof partnerData];
    return [{
      name: partnerInfo.name,
      value: filteredData.budget,
      color: '#f97316' // Orange
    }];
  }

  // For "all" partners, show distribution
  return Object.values(partnerData).map((partner, index) => {
    const colors = ['#f97316', '#3b82f6', '#10b981']; // Orange, Blue, Green
    return {
      name: partner.name,
      value: Math.floor(filteredData.budget * (partner.budget / Object.values(partnerData).reduce((sum, p) => sum + p.budget, 0))),
      color: colors[index % colors.length]
    };
  });
}

// Function to get state-wise district data
export function getStateDistrictData(state: string) {
  // Define state-specific resource usage patterns
  const stateResourcePatterns = {
    'andhra-pradesh': {
      english: 0.40,  // Higher emphasis on English
      mathematics: 0.30,
      science: 0.20,
      other: 0.10
    },
    'telangana': {
      english: 0.35,
      mathematics: 0.35,  // Equal emphasis on Math and English
      science: 0.20,
      other: 0.10
    },
    'karnataka': {
      english: 0.30,
      mathematics: 0.30,
      science: 0.30,  // Higher emphasis on Science
      other: 0.10
    },
    'tamil-nadu': {
      english: 0.35,
      mathematics: 0.25,
      science: 0.30,
      other: 0.10
    },
    'maharashtra': {
      english: 0.40,
      mathematics: 0.25,
      science: 0.25,
      other: 0.10
    },
    'gujarat': {
      english: 0.30,
      mathematics: 0.35,
      science: 0.25,
      other: 0.10
    },
    'kerala': {
      english: 0.45,  // Highest emphasis on English
      mathematics: 0.25,
      science: 0.20,
      other: 0.10
    },
    'odisha': {
      english: 0.35,
      mathematics: 0.30,
      science: 0.25,
      other: 0.10
    },
    'west-bengal': {
      english: 0.40,
      mathematics: 0.25,
      science: 0.25,
      other: 0.10
    }
  };

  // Base resource usage for each state
  const stateData = {
    'andhra-pradesh': {
      stvInstalled: 3250,
      teachersTrained: 42500,
      totalMeetings: 650,
      totalDistricts: 26,
      totalResources: 1456000
    },
    'telangana': {
      stvInstalled: 2800,
      teachersTrained: 38000,
      totalMeetings: 550,
      totalDistricts: 33,
      totalResources: 1200000
    },
    'karnataka': {
      stvInstalled: 2950,
      teachersTrained: 39500,
      totalMeetings: 580,
      totalDistricts: 31,
      totalResources: 1300000
    },
    'tamil-nadu': {
      stvInstalled: 3500,
      teachersTrained: 45000,
      totalMeetings: 700,
      totalDistricts: 38,
      totalResources: 1500000
    },
    'maharashtra': {
      stvInstalled: 3800,
      teachersTrained: 48000,
      totalMeetings: 750,
      totalDistricts: 36,
      totalResources: 1700000
    },
    'gujarat': {
      stvInstalled: 3100,
      teachersTrained: 41000,
      totalMeetings: 620,
      totalDistricts: 33,
      totalResources: 1300000
    },
    'kerala': {
      stvInstalled: 2200,
      teachersTrained: 32000,
      totalMeetings: 480,
      totalDistricts: 14,
      totalResources: 900000
    },
    'odisha': {
      stvInstalled: 2700,
      teachersTrained: 36000,
      totalMeetings: 520,
      totalDistricts: 30,
      totalResources: 1100000
    },
    'west-bengal': {
      stvInstalled: 2900,
      teachersTrained: 39000,
      totalMeetings: 580,
      totalDistricts: 23,
      totalResources: 1200000
    }
  };

  // If "All States" is selected, aggregate data from all states
  if (state === 'all') {
    const aggregatedData = {
      stvInstalled: 0,
      teachersTrained: 0,
      totalMeetings: 0,
      totalDistricts: 0,
      resourceUsage: {
        english: 0,
        mathematics: 0,
        science: 0,
        other: 0
      }
    };

    // Aggregate data from all states
    Object.values(stateData).forEach(stateInfo => {
      aggregatedData.stvInstalled += stateInfo.stvInstalled;
      aggregatedData.teachersTrained += stateInfo.teachersTrained;
      aggregatedData.totalMeetings += stateInfo.totalMeetings;
      aggregatedData.totalDistricts += stateInfo.totalDistricts;
    });

    // Calculate average resource usage pattern
    const avgPattern = {
      english: 0,
      mathematics: 0,
      science: 0,
      other: 0
    };

    Object.values(stateResourcePatterns).forEach(pattern => {
      avgPattern.english += pattern.english;
      avgPattern.mathematics += pattern.mathematics;
      avgPattern.science += pattern.science;
      avgPattern.other += pattern.other;
    });

    const totalStates = Object.keys(stateResourcePatterns).length;
    avgPattern.english /= totalStates;
    avgPattern.mathematics /= totalStates;
    avgPattern.science /= totalStates;
    avgPattern.other /= totalStates;

    // Calculate total resources across all states
    const totalResources = Object.values(stateData).reduce((sum, state) => sum + state.totalResources, 0);

    // Apply average pattern to total resources
    aggregatedData.resourceUsage = {
      english: Math.floor(totalResources * avgPattern.english),
      mathematics: Math.floor(totalResources * avgPattern.mathematics),
      science: Math.floor(totalResources * avgPattern.science),
      other: Math.floor(totalResources * avgPattern.other)
    };

    return aggregatedData;
  }

  // For specific state, use its data and pattern
  const stateInfo = stateData[state as keyof typeof stateData];
  const pattern = stateResourcePatterns[state as keyof typeof stateResourcePatterns];

  // If state not found, use default values
  if (!stateInfo || !pattern) {
    return {
      stvInstalled: 1500,
      teachersTrained: 25000,
      totalMeetings: 350,
      totalDistricts: 20,
      resourceUsage: {
        english: 245000,
        mathematics: 210000,
        science: 175000,
        other: 70000
      }
    };
  }

  return {
    stvInstalled: stateInfo.stvInstalled,
    teachersTrained: stateInfo.teachersTrained,
    totalMeetings: stateInfo.totalMeetings,
    totalDistricts: stateInfo.totalDistricts,
    resourceUsage: {
      english: Math.floor(stateInfo.totalResources * pattern.english),
      mathematics: Math.floor(stateInfo.totalResources * pattern.mathematics),
      science: Math.floor(stateInfo.totalResources * pattern.science),
      other: Math.floor(stateInfo.totalResources * pattern.other)
    }
  };
} 