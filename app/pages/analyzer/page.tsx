"use client"
import React, { useState } from 'react';
import { Upload, Check, Loader, Search, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '../../ui/analyzer/Card';
import { Button } from '../../ui/analyzer/Button';
import { TextInput } from '../../ui/analyzer/Text';
import Cookies from 'js-cookie';
import { Footer } from '@/app/common/Footer';
import ResumeHeader from '@/app/ui/resume/ResumeHeader';

interface AnalysisResult {
  points: number;
  positive: string[];
  negative: string[];
}

const ResumeAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get('token');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a file to analyze.');
      return;
    }

    setIsScanning(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const {data}:any = await response.json();
      console.log(data.points,"this is data");
      console.log(response,"this is response");
      
      

      if (response.ok) {
        const analysisResult: AnalysisResult = {
          points: data.points,
          positive: data.positive,
          negative: data.negative
        };
        setResult(analysisResult);
        
        // Use useEffect or move console.log after state update if you need to see updated result
        console.log('Analysis result:', analysisResult);
      } else {
        setError(data.error || 'Failed to analyze resume');
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred while analyzing the resume.');
    } finally {
      setIsScanning(false);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getGradeColor = (score: number): string => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <>
    <ResumeHeader/>
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-5xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Resume Analysis</h2>
                <p className="text-gray-500 mt-2">Upload your resume for AI-powered analysis</p>
              </div>

              <label 
                htmlFor="file-input"
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 
                  ${file ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400'} 
                  transition-colors cursor-pointer`}
              >
                {file ? (
                  <div className="text-center">
                    <Check className="w-12 h-12 text-blue-500 mb-2" />
                    <p className="text-sm text-gray-600 font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Click to change file</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 font-medium">Drop your resume here or click to browse</p>
                    <p className="text-xs text-gray-500 mt-1">Supports PDF and DOC formats</p>
                  </>
                )}
              </label>

              <TextInput
                id="file-input"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />

              <Button
                onClick={handleAnalyze}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                disabled={isScanning || !file}
              >
                <div className="flex items-center justify-center space-x-2">
                  {isScanning ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Analyze Resume</span>
                    </>
                  )}
                </div>
              </Button>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertTriangle className="w-5 h-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Results Section */}
            {result && (
              <div className="space-y-6">
                {/* Score Card */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="space-y-1">
                      <p className="text-gray-500 text-sm">Overall Score</p>
                      <div className="flex items-baseline space-x-2">
                        <h3 className={`text-4xl font-bold ${getScoreColor(result.points)}`}>
                          {result.points}
                        </h3>
                        <span className="text-gray-400">/100</span>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full ${getGradeColor(result.points)}`}>
                      {result.points >= 80 ? 'Excellent' : result.points >= 60 ? 'Good' : 'Needs Improvement'}
                    </div>
                  </div>
                </div>

                {/* Strengths */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {result.positive&&result.positive.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                        <p className="text-gray-600 text-sm">{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                    Areas for Improvement
                  </h3>
                  <ul className="space-y-2">
                    {result.negative&&result.negative.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2" />
                        <p className="text-gray-600 text-sm">{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
    <Footer/>
    </>
  );
};

export default ResumeAnalyzer;