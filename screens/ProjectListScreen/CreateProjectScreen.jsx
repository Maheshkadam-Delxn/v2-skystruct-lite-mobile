import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

/**
 * CreateProjectScreen
 * - Full UI matching provided screenshot
 * - Functional file picker (expo-document-picker)
 * - Simulated upload progress for files
 * - All form fields shown on the screenshot
 */

const SAMPLE_IMG =
  'https://images.unsplash.com/photo-1505842465776-3d4f5d16a3f4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=0b5f1b6a80f0f8a0b60b38aeb1d6c3f9';

const CreateProjectScreen = ({ navigation }) => {
  // form state
  const [projectName, setProjectName] = useState('Project Name 1');
  const [description, setDescription] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...'
  );
  const [clientName, setClientName] = useState('arun.mishra@gmail.com');
  const [clientEmail, setClientEmail] = useState('arun.mishra@gmail.com');
  const [clientPhone, setClientPhone] = useState('9326261416');
  const [address, setAddress] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...'
  );
  const [startDate, setStartDate] = useState('2026-03-22');
  const [endDate, setEndDate] = useState('2026-03-22');
  const [budgetAmount, setBudgetAmount] = useState('$95,000');

  // uploaded files state
  const [files, setFiles] = useState([
    // Pre-populated examples to match screenshot style
    {
      id: 'f1',
      name: 'Website templates.psd',
      mimeType: 'image/vnd.adobe.photoshop',
      progress: 0.7,
      uploading: false,
    },
    {
      id: 'f2',
      name: 'Logo vector.ai',
      mimeType: 'application/postscript',
      progress: 0.45,
      uploading: false,
    },
    {
      id: 'f3',
      name: 'Wireframe for team.figma',
      mimeType: 'application/octet-stream',
      progress: 0.3,
      uploading: false,
    },
  ]);

  // keep refs to intervals to clear on remove
  const uploadIntervals = useRef({});

  /* ------- Helper: icon chooser by filename or mime ------- */
  const getFileIcon = (fileName) => {
    const name = (fileName || '').toLowerCase();
    if (name.endsWith('.psd')) return { icon: 'ps', provider: 'custom' };
    if (name.endsWith('.ai')) return { icon: 'ai', provider: 'custom' };
    if (name.endsWith('.fig') || name.includes('figma')) return { icon: 'figma', provider: 'custom' };
    if (name.endsWith('.pdf')) return { icon: 'file-pdf-box', provider: 'material' };
    if (name.endsWith('.zip')) return { icon: 'zip-box', provider: 'material' };
    return { icon: 'file-document-outline', provider: 'material' };
  };

  /* ------- Document picker & simulated upload ------- */
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
        type: '*/*',
      });

      if (res.type === 'success') {
        const newFile = {
          id: `${Date.now()}`,
          name: res.name,
          mimeType: res.mimeType || 'application/octet-stream',
          progress: 0,
          uploading: true,
        };

        setFiles((prev) => [newFile, ...prev]);

        // simulate upload progress
        const intervalId = setInterval(() => {
          setFiles((prev) =>
            prev.map((f) => {
              if (f.id !== newFile.id) return f;
              const next = Math.min(1, f.progress + Math.random() * 0.12);
              return { ...f, progress: next, uploading: next < 1 };
            })
          );
        }, 450);

        uploadIntervals.current[newFile.id] = intervalId;

        // clear interval when done (watch state)
        // We'll also clear intervals on remove
      }
    } catch (err) {
      console.warn('DocPicker error', err);
    }
  };

  // monitor files to clear intervals for completed ones
  React.useEffect(() => {
    files.forEach((f) => {
      if (f.progress >= 1 && uploadIntervals.current[f.id]) {
        clearInterval(uploadIntervals.current[f.id]);
        delete uploadIntervals.current[f.id];
      }
    });

    // cleanup on unmount
    return () => {
      Object.values(uploadIntervals.current).forEach(clearInterval);
      uploadIntervals.current = {};
    };
  }, [files]);

  const removeFile = (id) => {
    // clear any running interval
    if (uploadIntervals.current[id]) {
      clearInterval(uploadIntervals.current[id]);
      delete uploadIntervals.current[id];
    }
    setFiles((prev) => prev.filter((p) => p.id !== id));
  };

  /* ------- Render single uploaded file row ------- */
  const renderFileRow = (file) => {
    const { icon, provider } = getFileIcon(file.name);
    return (
      <View key={file.id} style={styles.uploadedRow}>
        <View style={styles.fileLeft}>
          <View style={styles.fileThumb}>
            {provider === 'material' ? (
              <MaterialCommunityIcons name={icon} size={20} color="#0066FF" />
            ) : icon === 'ps' ? (
              <View style={styles.smallBadge}>
                <Text style={styles.smallBadgeText}>Ps</Text>
              </View>
            ) : icon === 'ai' ? (
              <View style={[styles.smallBadge, { backgroundColor: '#FFEBCF' }]}>
                <Text style={[styles.smallBadgeText, { color: '#D96C00' }]}>Ai</Text>
              </View>
            ) : (
              <View style={styles.smallBadge}>
                <Text style={styles.smallBadgeText}>F</Text>
              </View>
            )}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.uploadFileName}>{file.name}</Text>
            <View style={styles.uploadProgressBg}>
              <View style={[styles.uploadProgressFill, { width: `${Math.round(file.progress * 100)}%` }]} />
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => removeFile(file.id)} style={styles.removeBtn}>
          <Ionicons name="close-circle" size={20} color="#FA5353" />
        </TouchableOpacity>
      </View>
    );
  };

  /* ------- Submit (dummy) ------- */
  const handleCreate = () => {
    // Simple validation example
    if (!projectName.trim()) {
      Alert.alert('Validation', 'Project name is required');
      return;
    }
    Alert.alert('Project Created', 'This is demo UI only — integrate backend as needed.');
    // if navigation.goBack exists, you might go back
    navigation?.goBack?.();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header gradient and curve */}
      <LinearGradient
        colors={['#0070FF', '#2556FF']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation?.goBack?.()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create New Project</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-vertical" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* Image avatar with edit */}
          <View style={styles.imageRow}>
            <Image source={{ uri: SAMPLE_IMG }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <MaterialCommunityIcons name="pencil" size={14} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Form fields in the card */}
          <View style={styles.formBlock}>
            <Text style={styles.fieldLabel}>Project Name</Text>
            <TextInput
              value={projectName}
              onChangeText={setProjectName}
              placeholder="Project Name"
              placeholderTextColor="#9AA3B2"
              style={styles.fieldInput}
            />
            <View style={styles.fieldUnderline} />

            <Text style={styles.fieldLabel}>Project Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Project Description"
              placeholderTextColor="#9AA3B2"
              style={[styles.fieldInput, { height: 70 }]}
              multiline
            />
            <View style={styles.fieldUnderline} />

            <Text style={styles.fieldLabel}>Client Name</Text>
            <TextInput
              value={clientName}
              onChangeText={setClientName}
              placeholder="Client Name"
              placeholderTextColor="#9AA3B2"
              style={styles.fieldInput}
            />
            <View style={styles.fieldUnderline} />

            <Text style={styles.fieldLabel}>Client Email</Text>
            <TextInput
              value={clientEmail}
              onChangeText={setClientEmail}
              placeholder="Client Email"
              placeholderTextColor="#9AA3B2"
              style={styles.fieldInput}
              keyboardType="email-address"
            />
            <View style={styles.fieldUnderline} />

            <Text style={styles.fieldLabel}>Client Phone</Text>
            <TextInput
              value={clientPhone}
              onChangeText={setClientPhone}
              placeholder="Client Phone"
              placeholderTextColor="#9AA3B2"
              style={styles.fieldInput}
              keyboardType="phone-pad"
            />
            <View style={styles.fieldUnderline} />

            <Text style={styles.fieldLabel}>Address / Location</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Address / Location"
              placeholderTextColor="#9AA3B2"
              style={[styles.fieldInput, { height: 70 }]}
              multiline
            />
            <View style={styles.fieldUnderline} />

            <View style={styles.rowTwo}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={styles.fieldLabel}>Start Date</Text>
                <TextInput style={styles.fieldInput} value={startDate} onChangeText={setStartDate} />
                <View style={styles.fieldUnderline} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>End Date</Text>
                <TextInput style={styles.fieldInput} value={endDate} onChangeText={setEndDate} />
                <View style={styles.fieldUnderline} />
              </View>
            </View>

            <Text style={styles.fieldLabel}>Budget Amount</Text>
            <TextInput value={budgetAmount} onChangeText={setBudgetAmount} style={styles.fieldInput} />
            <View style={styles.fieldUnderline} />

            {/* Upload section */}
            <Text style={[styles.fieldLabel, { marginTop: 8 }]}>Upload Files</Text>

            <TouchableOpacity style={styles.uploadCircle} onPress={pickDocument}>
              <Ionicons name="cloud-upload-outline" size={22} color="#0066FF" />
            </TouchableOpacity>
            <Text style={styles.uploadHint}>Browse files to upload</Text>

            {/* Uploaded list */}
            <Text style={[styles.subHeading, { marginTop: 16 }]}>Uploaded</Text>
            <View style={{ marginTop: 10 }}>
              {files.map((f) => renderFileRow(f))}
            </View>
          </View>

          {/* Create button */}
          <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
            <Text style={styles.createBtnText}>Create Project</Text>
          </TouchableOpacity>
        </View>

        {/* bottom spacing */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom navigation (visual only) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={22} color="#7F8C8D" />
          <Text style={styles.navText}>Home</Text>\
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="apps-sharp" size={22} color="#0066FF" />
          <Text style={[styles.navText, { color: '#0066FF' }]}>Projects</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="credit-card-outline" size={22} color="#7F8C8D" />
          <Text style={styles.navText}>Payments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="clipboard-outline" size={22} color="#7F8C8D" />
          <Text style={styles.navText}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#7F8C8D" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

/* ----------------------- Styles ----------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 18 : 14,
    paddingBottom: 22,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },

  imageRow: {
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 12,
    backgroundColor: '#EAF1FF',
  },
  editAvatarBtn: {
    position: 'absolute',
    right: (Platform.OS === 'ios' ? 120 / 2 - 22 : 120 / 2 - 22),
    bottom: 6,
    backgroundColor: '#0066FF',
    padding: 8,
    borderRadius: 18,
    elevation: 3,
  },

  formBlock: {
    paddingTop: 8,
  },
  fieldLabel: {
    fontSize: 13,
    color: '#2C3E50',
    fontWeight: '600',
    marginTop: 8,
  },
  fieldInput: {
    fontSize: 15,
    color: '#2C3E50',
    paddingVertical: 6,
  },
  fieldUnderline: {
    height: 1,
    backgroundColor: '#2E66FF',
    marginTop: 4,
    width: '100%',
    opacity: 0.6,
    marginBottom: 2,
  },

  rowTwo: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 6 },

  uploadCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#F6F8FB',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    elevation: 2,
  },
  uploadHint: {
    textAlign: 'center',
    marginTop: 8,
    color: '#9AA3B2',
    fontSize: 13,
  },

  subHeading: { fontSize: 14, fontWeight: '700', color: '#2C3E50' },

  uploadedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FBFDFF',
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  fileLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  fileThumb: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#EAF1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  smallBadge: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#EAF1FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallBadgeText: { fontWeight: '700', color: '#0070FF' },

  uploadFileName: { fontSize: 14, fontWeight: '700', color: '#2C3E50', marginBottom: 6 },
  uploadProgressBg: {
    height: 6,
    backgroundColor: '#E7EEFF',
    borderRadius: 6,
    width: '100%',
    overflow: 'hidden',
  },
  uploadProgressFill: {
    height: 6,
    backgroundColor: '#0066FF',
    borderRadius: 6,
    width: '30%',
  },
  removeBtn: { marginLeft: 10 },

  createBtn: {
    marginTop: 18,
    backgroundColor: '#0066FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  createBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 78,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 11, color: '#7F8C8D', marginTop: 4 },
});

export default CreateProjectScreen;
