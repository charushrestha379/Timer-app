import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number): string => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hours} : ${minutes} : ${secs}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsFinished(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleQuit = () => {
    setSeconds(0);
    setIsRunning(false);
    setIsFinished(false);
  };

  const handleFinish = () => {
    setIsRunning(false);
    setIsFinished(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Timer</Text>
      <View style={styles.timerBox}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      </View>

      {!isRunning && seconds === 0 && (
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}

      {isRunning && (
        <>
          <TouchableOpacity style={styles.button} onPress={handlePause}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOutline} onPress={handleQuit}>
            <Text style={styles.outlineText}>Quit</Text>
          </TouchableOpacity>
        </>
      )}

      {!isRunning && seconds > 0 && !isFinished && (
  <>
    <TouchableOpacity style={styles.button} onPress={handleStart}>
      <Text style={styles.buttonText}>Resume</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonOutline} onPress={handleFinish}>
      <Text style={styles.outlineText}>Finish</Text>
    </TouchableOpacity>
  </>
)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    marginBottom: 40,
    fontWeight: '600',
  },
  timerBox: {
    marginBottom: 40,
    padding: 30,
    borderRadius: 200,
    backgroundColor: 'rgba(200, 220, 255, 0.2)',
  },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonOutline: {
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
  },
  outlineText: {
    fontSize: 16,
    color: '#000',
  },
});
