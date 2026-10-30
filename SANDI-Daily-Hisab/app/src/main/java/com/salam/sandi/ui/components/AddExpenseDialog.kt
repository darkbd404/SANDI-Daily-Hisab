package com.salam.sandi.ui.components

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.salam.sandi.data.entity.ExpenseEntity
import com.salam.sandi.ui.theme.*
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun AddExpenseDialog(
    onDismiss: () -> Unit,
    onSave: (ExpenseEntity) -> Unit
) {
    var amountText by remember { mutableStateOf("") }
    var descText by remember { mutableStateOf("") }
    var vendorText by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf("BATTERY_CHARGING") }
    var errorMessage by remember { mutableStateOf("") }

    val categories = listOf(
        "BATTERY_CHARGING" to "🔋 ব্যাটারি ফুল চার্জিং বিল",
        "PERSONAL_EXPENSE" to "☕ নাস্তা ও ব্যক্তিগত খরচ",
        "TIRE_TUBE" to "⚙️ টায়ার, টিউব ও পাংচার",
        "VEHICLE_REPAIR" to "🔧 সার্ভিসিং ও পার্টস",
        "OTHER" to "📝 অন্যান্য খরচ"
    )

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = "নতুন ব্যয় / খরচ যোগ করুন",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = ExpenseRed
            )
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                OutlinedTextField(
                    value = amountText,
                    onValueChange = { 
                        amountText = it
                        errorMessage = ""
                    },
                    label = { Text("খরচের পরিমাণ (টাকা / ৳)") },
                    placeholder = { Text("যেমন: ১৪০") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                Text("খরচের খাত নির্বাচন করুন:", style = MaterialTheme.typography.bodySmall, color = MutedSlate)

                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    categories.forEach { (catKey, label) ->
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
                        ) {
                            RadioButton(
                                selected = selectedCategory == catKey,
                                onClick = { 
                                    selectedCategory = catKey
                                    if (descText.isBlank()) {
                                        descText = label.substringAfter(" ")
                                    }
                                }
                            )
                            Text(label, style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }

                OutlinedTextField(
                    value = descText,
                    onValueChange = { descText = it },
                    label = { Text("খরচের বিস্তারিত বিবরণ") },
                    placeholder = { Text("যেমন: রাত্রিকালীন চার্জিং বিল") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                OutlinedTextField(
                    value = vendorText,
                    onValueChange = { vendorText = it },
                    label = { Text("দোকান / গ্যারেজের নাম (অপশনাল)") },
                    placeholder = { Text("যেমন: আমড়াতলী গ্যারেজ") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                if (errorMessage.isNotEmpty()) {
                    Text(
                        text = errorMessage,
                        color = ExpenseRed,
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val amountNum = amountText.toDoubleOrNull()
                    if (amountNum == null || amountNum <= 0) {
                        errorMessage = "সঠিক টাকার পরিমাণ লিখুন"
                        return@Button
                    }
                    val todayDate = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date())
                    val currentTime = SimpleDateFormat("HH:mm", Locale.getDefault()).format(Date())
                    val finalDesc = if (descText.isNotBlank()) descText else "সাধারণ খরচ"

                    val entity = ExpenseEntity(
                        id = "exp-${System.currentTimeMillis()}",
                        amountPoisha = (amountNum * 100).toLong(),
                        date = todayDate,
                        time = currentTime,
                        category = selectedCategory,
                        description = finalDesc,
                        vendorName = vendorText.ifBlank { "নগদ খরচ" },
                        paymentMethod = "CASH"
                    )
                    onSave(entity)
                },
                colors = ButtonDefaults.buttonColors(containerColor = ExpenseRed)
            ) {
                Text("সংরক্ষণ করুন", color = TextWhite, fontWeight = FontWeight.Bold)
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("বাতিল", color = MutedSlate)
            }
        }
    )
}
