import { colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

const steps = [1, 2, 3] as const;

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <View key={step} style={styles.stepWrapper}>
            <View
              style={[
                styles.circle,
                isActive && styles.activeCircle,
                isCompleted && styles.completedCircle,
              ]}
            >
              <Text
                style={[
                  styles.stepText,
                  isActive && styles.activeText,
                  isCompleted && styles.completedText,
                ]}
              >
                {step}
              </Text>
            </View>

            {index < steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  step < currentStep && styles.completedLine,
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default StepIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  stepWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary[100],
  },

  activeCircle: {
    backgroundColor: colors.primary[600],
  },

  completedCircle: {
    backgroundColor: colors.primary[100],
  },

  stepText: {
    fontSize: 18,
    fontFamily: "Pretendard-Medium",
    color: colors.primary[500],
  },

  activeText: {
    color: colors.grayscale[200],
  },

  completedText: {
    color: colors.primary[500],
  },

  line: {
    width: 46,
    height: 3,
    backgroundColor: colors.primary[200],
  },

  completedLine: {
    backgroundColor: colors.primary[200],
  },
});
