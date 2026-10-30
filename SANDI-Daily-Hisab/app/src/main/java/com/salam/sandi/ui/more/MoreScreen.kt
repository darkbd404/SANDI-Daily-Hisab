package com.salam.sandi.ui.more

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.salam.sandi.data.entity.BatteryEntity
import com.salam.sandi.data.entity.MaintenanceEntity
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.theme.*
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun MoreScreen(repository: SandiRepository) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()
    
    val batteryRecords by repository.allBatteryRecords.collectAsState(initial = emptyList())
    val maintenanceRecords by repository.allMaintenanceRecords.collectAsState(initial = emptyList())

    var showConfirmClearDialog by remember { mutableStateOf(false) }
    var showAddBatteryDialog by remember { mutableStateOf(false) }
    var showAddMaintenanceDialog by remember { mutableStateOf(false) }

    // Dialog for adding Battery Charge Record
    if (showAddBatteryDialog) {
        var costText by remember { mutableStateOf("") }
        var unitsText by remember { mutableStateOf("") }
        var notesText by remember { mutableStateOf("") }

        AlertDialog(
            onDismissRequest = { showAddBatteryDialog = false },
            title = { Text("ব্যাটারি চার্জিং রেকর্ড যোগ করুন", fontWeight = FontWeight.Bold, color = GoldAccent) },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    OutlinedTextField(
                        value = costText,
                        onValueChange = { costText = it },
                        label = { Text("চার্জিং বিদ্যুৎ বিল (টাকা)") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    OutlinedTextField(
                        value = unitsText,
                        onValueChange = { unitsText = it },
                        label = { Text("ব্যবহৃত ইউনিট (kWh) - ঐচ্ছিক") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    OutlinedTextField(
                        value = notesText,
                        onValueChange = { notesText = it },
                        label = { Text("নোট বা মন্তব্য") },
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        val cost = costText.toDoubleOrNull() ?: 0.0
                        if (cost > 0) {
                            val today = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date())
                            val time = SimpleDateFormat("HH:mm", Locale.getDefault()).format(Date())
                            coroutineScope.launch {
                                repository.batteryDao.insertBatteryRecord(
                                    BatteryEntity(
                                        date = today,
                                        time = time,
                                        chargingUnits = unitsText.toDoubleOrNull(),
                                        costPoisha = (cost * 100).toLong(),
                                        chargingDurationHours = 8.0,
                                        batteryHealthPercent = 98,
                                        notes = notesText
                                    )
                                )
                                showAddBatteryDialog = false
                                Toast.makeText(context, "ব্যাটারি তথ্য সংরক্ষিত হয়েছে", Toast.LENGTH_SHORT).show()
                            }
                        } else {
                            Toast.makeText(context, "সঠিক টাকার পরিমাণ দিন", Toast.LENGTH_SHORT).show()
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = GoldAccent)
                ) {
                    Text("সংরক্ষণ করুন", color = ObsidianBlack, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showAddBatteryDialog = false }) {
                    Text("বাতিল", color = MutedSlate)
                }
            }
        )
    }

    // Dialog for adding Maintenance Record
    if (showAddMaintenanceDialog) {
        var workshopText by remember { mutableStateOf("") }
        var partsText by remember { mutableStateOf("") }
        var serviceText by remember { mutableStateOf("") }
        var costText by remember { mutableStateOf("") }

        AlertDialog(
            onDismissRequest = { showAddMaintenanceDialog = false },
            title = { Text("সার্ভিসিং ও পার্টস রেকর্ড", fontWeight = FontWeight.Bold, color = ProfitSky) },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    OutlinedTextField(
                        value = workshopText,
                        onValueChange = { workshopText = it },
                        label = { Text("ওয়ার্কশপ/গ্যারেজের নাম") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    OutlinedTextField(
                        value = partsText,
                        onValueChange = { partsText = it },
                        label = { Text("পরিবর্তিত যন্ত্রাংশ/পার্টস") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    OutlinedTextField(
                        value = serviceText,
                        onValueChange = { serviceText = it },
                        label = { Text("সার্ভিস বিবরণ") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    OutlinedTextField(
                        value = costText,
                        onValueChange = { costText = it },
                        label = { Text("মোট খরচ (টাকা)") },
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        val cost = costText.toDoubleOrNull() ?: 0.0
                        if (cost > 0) {
                            val today = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date())
                            coroutineScope.launch {
                                repository.maintenanceDao.insertMaintenanceRecord(
                                    MaintenanceEntity(
                                        date = today,
                                        workshopName = workshopText,
                                        partsReplaced = partsText,
                                        serviceDescription = serviceText,
                                        costPoisha = (cost * 100).toLong()
                                    )
                                )
                                showAddMaintenanceDialog = false
                                Toast.makeText(context, "সার্ভিসিং তথ্য সংরক্ষিত হয়েছে", Toast.LENGTH_SHORT).show()
                            }
                        } else {
                            Toast.makeText(context, "সঠিক টাকার পরিমাণ দিন", Toast.LENGTH_SHORT).show()
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = ProfitSky)
                ) {
                    Text("সংরক্ষণ করুন", color = ObsidianBlack, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showAddMaintenanceDialog = false }) {
                    Text("বাতিল", color = MutedSlate)
                }
            }
        )
    }

    if (showConfirmClearDialog) {
        AlertDialog(
            onDismissRequest = { showConfirmClearDialog = false },
            title = {
                Text(
                    text = "সকল হিসাব মুছে ফেলবেন?",
                    color = ExpenseRed,
                    fontWeight = FontWeight.Bold
                )
            },
            text = {
                Text(
                    text = "আপনি কি নিশ্চিত সকল আয়, ব্যয় ও ভাউচারের হিসাব সম্পূর্ণ মুছে ব্যালেন্স ০ করতে চান? আপনার নতুন হিসাব নিজে এন্ট্রি দেওয়ার জন্য খাতা খালি হবে।",
                    style = MaterialTheme.typography.bodyMedium
                )
            },
            confirmButton = {
                Button(
                    onClick = {
                        coroutineScope.launch {
                            repository.clearAllData()
                            showConfirmClearDialog = false
                            Toast.makeText(context, "সকল হিসাব মুছে ০ ব্যালেন্স করা হয়েছে", Toast.LENGTH_SHORT).show()
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = ExpenseRed)
                ) {
                    Text("হ্যাঁ, সব মুছুন", color = TextWhite, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showConfirmClearDialog = false }) {
                    Text("না, রাখুন", color = MutedSlate)
                }
            }
        )
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(ObsidianBlack)
            .padding(horizontal = 16.dp, vertical = 8.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        item {
            Column {
                Text(
                    text = "গাড়ি ও স্বত্বাধিকারীর তথ্য",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = GoldAccent
                )
                Text(
                    text = "ব্যক্তিগত অটো ইজি বাইক প্রোফাইল, ব্যাটারি ও সার্ভিস ট্র্যাকার",
                    style = MaterialTheme.typography.bodySmall,
                    color = MutedSlate
                )
            }
        }

        // Owner Profile Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Person, contentDescription = null, tint = GoldAccent)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "স্বত্বাধিকারী: আব্দুছ ছালাম",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = TextWhite
                        )
                    }

                    Text(text = "মোবাইল ১: ০১৬২০২৩০৮৬৪", style = MaterialTheme.typography.bodyMedium, color = TextWhite)
                    Text(text = "মোবাইল ২: ০১৬৩২৩৩১৮৬৪", style = MaterialTheme.typography.bodyMedium, color = TextWhite)
                    Text(text = "ইমেইল: salam230864@gmail.com", style = MaterialTheme.typography.bodySmall, color = MutedSlate)
                    Text(text = "ঠিকানা: গ্রাম: ফলকামুড়ী, ডাকঘর: আমড়াতলী বাজার, থানা: বরুড়া, জেলা: কুমিল্লা।", style = MaterialTheme.typography.bodySmall, color = MutedSlate)
                }
            }
        }

        // Vehicle Specs Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.DirectionsCar, contentDescription = null, tint = ProfitSky)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "যানবাহন স্পেসিফিকেশন",
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = TextWhite
                        )
                    }

                    Text(text = "ব্র্যান্ড ও প্রস্তুতকারক: Sandi (Sandi Company)", style = MaterialTheme.typography.bodyMedium, color = TextWhite)
                    Text(text = "মডেল: SANDI Passenger Electric Easy Bike", style = MaterialTheme.typography.bodySmall, color = MutedSlate)
                    Text(text = "রেজিস্ট্রেশন নম্বর: কুমিল্লা-থ-১১-৪৫০২", style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.Bold, color = GoldAccent)
                    Text(text = "ব্যাটারি: 60V 130Ah Tubular Deep Cycle (5 x 12V 130Ah)", style = MaterialTheme.typography.bodySmall, color = MutedSlate)
                    Text(text = "মোটর: 1200W High Torque BLDC Differential", style = MaterialTheme.typography.bodySmall, color = MutedSlate)
                }
            }
        }

        // Battery Charging Tracker Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.BatteryChargingFull, contentDescription = null, tint = GoldAccent)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "ব্যাটারি চার্জিং ট্র্যাকার (${batteryRecords.size} টি এন্ট্রি)",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                color = TextWhite
                            )
                        }
                        IconButton(onClick = { showAddBatteryDialog = true }) {
                            Icon(Icons.Default.AddCircle, contentDescription = "যোগ করুন", tint = GoldAccent)
                        }
                    }
                    Text(
                        text = "৬০ ভোল্ট ১৩০ অ্যাম্পিয়ার ব্যাটারির চার্জিং সময় ও বিদ্যুৎ বিল ট্র্যাকিং",
                        style = MaterialTheme.typography.bodySmall,
                        color = MutedSlate
                    )
                }
            }
        }

        // Maintenance & Repair Tracker Card
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Build, contentDescription = null, tint = ProfitSky)
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "রক্ষণাবেক্ষণ ও গ্যারেজ সার্ভিস (${maintenanceRecords.size} টি এন্ট্রি)",
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                color = TextWhite
                            )
                        }
                        IconButton(onClick = { showAddMaintenanceDialog = true }) {
                            Icon(Icons.Default.AddCircle, contentDescription = "যোগ করুন", tint = ProfitSky)
                        }
                    }
                    Text(
                        text = "মোটর, টায়ার, ব্রেক ও গ্যারেজ ওয়ার্কশপ খরচের ইতিহাস",
                        style = MaterialTheme.typography.bodySmall,
                        color = MutedSlate
                    )
                }
            }
        }

        // Data Reset Section
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                shape = RoundedCornerShape(16.dp),
                border = CardDefaults.outlinedCardBorder().copy(brush = androidx.compose.ui.graphics.SolidColor(ExpenseRed.copy(alpha = 0.4f)))
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(
                        text = "ডাটা রিসেট ও ফ্রেশ খাতা",
                        style = MaterialTheme.typography.titleSmall,
                        fontWeight = FontWeight.Bold,
                        color = ExpenseRed
                    )
                    Text(
                        text = "সকল আয়-ব্যয় মুছে নতুন করে নিজের আসল হিসাব এন্ট্রি দিতে চাইলে নিচের বাটনে চাপ দিন।",
                        style = MaterialTheme.typography.bodySmall,
                        color = MutedSlate
                    )

                    Button(
                        onClick = { showConfirmClearDialog = true },
                        colors = ButtonDefaults.buttonColors(containerColor = ExpenseRed.copy(alpha = 0.85f)),
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp)
                    ) {
                        Icon(Icons.Default.Delete, contentDescription = null, tint = TextWhite)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "সকল লেনদেন মুছে ০ ব্যালেন্স করুন",
                            color = TextWhite,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }

        // Offline Guarantee
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = CardNavy.copy(alpha = 0.6f)),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Shield, contentDescription = null, tint = IncomeGreen)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "১০০% অফলাইন নিশ্চয়তা",
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Bold,
                            color = IncomeGreen
                        )
                    }
                    Text(
                        text = "এই অ্যাপটি ইন্টারনেট ছাড়া বিমান মোডেও সম্পূর্ণ সক্রিয় থাকে। আপনার সমস্ত আর্থিক তথ্য আপনার ডিভাইসের অফলাইন SQLite ডাটাবেজে সুরক্ষিত আছে।",
                        style = MaterialTheme.typography.bodySmall,
                        color = MutedSlate
                    )
                    Text(
                        text = "সংস্করণ: ১.০.০ · প্যাকেজ: com.salam.sandi",
                        style = MaterialTheme.typography.labelSmall,
                        color = MutedSlate.copy(alpha = 0.6f)
                    )
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

