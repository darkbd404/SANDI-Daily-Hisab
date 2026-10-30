package com.salam.sandi.ui.more

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
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
import com.salam.sandi.data.repository.SandiRepository
import com.salam.sandi.ui.theme.*
import kotlinx.coroutines.launch

@Composable
fun MoreScreen(repository: SandiRepository) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()
    var showConfirmClearDialog by remember { mutableStateOf(false) }

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
                    text = "ব্যক্তিগত অটো ইজি বাইক প্রোফাইল ও সেটিংস",
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
